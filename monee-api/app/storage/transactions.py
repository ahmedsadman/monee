from datetime import date

from sqlalchemy import desc, func
from sqlalchemy.future import select

from app import models, schemas
from app.db import session
from app.enums import TransactionType
from app.utils import calculate_transaction_uid
from app.storage.utils import FilterBuilder


class TransactionStorage:
    @staticmethod
    async def add_transactions(transactions: list[schemas.TransactionCreate]):
        to_add = []

        for transaction in transactions:
            calculated_uid = calculate_transaction_uid(transaction, transaction.account_id)
            if not await TransactionStorage.transaction_exists(calculated_uid):
                to_add.append(transaction)

        db_transactions = [models.Transaction(**transaction.dict()) for transaction in to_add]
        session().add_all(db_transactions)
        return db_transactions

    @staticmethod
    async def transaction_exists(uid: str):
        statement = select(models.Transaction).where(models.Transaction.uid == uid)
        result = await session().scalars(statement)
        return result.first() is not None

    @staticmethod
    async def search_transactions(
            start_date: date | None,
            end_date: date | None,
            description: str | None,
            offset: int = 0, limit: int = 50
            ) -> list[models.Transaction]:

        query_filters = FilterBuilder(models.Transaction).add_date_filters(start_date, end_date).get()

        if description:
            query_filters.append(models.Transaction.description == description)

        statement = select(models.Transaction).where(*query_filters).offset(offset).limit(limit)

        results = await session().scalars(statement)
        return results.all()

    @staticmethod
    async def get_statistics(start_date: date | None, end_date: date | None) -> list:
        query_filters = FilterBuilder(models.Transaction).add_date_filters(start_date, end_date).get()

        stmt = select(func.sum(models.Transaction.amount), func.count(models.Transaction.amount)) \
            .group_by(models.Transaction.type) \
            .where(*query_filters)

        '''
        session.execute returns all columns
        session.execute can be used for ORM instances, but need to add some more code to get the instance column.
        session.scalar returns a single column, the column value being the ORM instance
        session.scalar is useful when selecting only ORM entities. It's a convenient version of session.execute
        session.execute is required when we're dealing with non-ORM instances,
        like here we're using aggregate functions
        '''
        results = await session().execute(stmt)
        return results.all()

    @staticmethod
    async def get_grouped_by_desciption(start_date: date | None, end_date: date | None,
                                        transaction_type: TransactionType | None,
                                        offset: int = 0, limit: int = 50) -> list:

        query_filters = FilterBuilder(models.Transaction).add_date_filters(start_date, end_date).get()

        if transaction_type:
            query_filters.append(models.Transaction.type == transaction_type)

        stmt = select(
                    models.Transaction.description, models.Transaction.type,
                    func.sum(models.Transaction.amount), func.count(models.Transaction.amount)
                ) \
            .group_by(models.Transaction.description, models.Transaction.type) \
            .order_by(desc(func.sum(models.Transaction.amount))) \
            .where(*query_filters).offset(offset).limit(limit)

        results = await session().execute(stmt)
        return results.all()

    @staticmethod
    async def get_grouped_by_month(start_date: date | None, end_date: date | None) -> list:
        query_filters = FilterBuilder(models.Transaction).add_date_filters(start_date, end_date).get()

        stmt = select(
                    models.Transaction.type,
                    func.year(models.Transaction.date),
                    func.month(models.Transaction.date),
                    func.sum(models.Transaction.amount), func.count(models.Transaction.amount)
                ) \
            .group_by(
                    models.Transaction.type,
                    func.year(models.Transaction.date),
                    func.month(models.Transaction.date),
                ) \
            .order_by(desc(func.sum(models.Transaction.amount))) \
            .where(*query_filters)

        results = await session().execute(stmt)

        month_year_map = dict()

        all_result = results.all()

        for item in all_result:
            _date = f'{item.year}-{item.month:02}'
            withdraw_count_key = f'{TransactionType.WITHDRAW}_count'
            deposit_count_key = f'{TransactionType.DEPOSIT}_count'

            month_year_map.setdefault(_date, {
                    'date': _date,
                    TransactionType.WITHDRAW: 0,
                    TransactionType.DEPOSIT: 0,
                    withdraw_count_key: 0,
                    deposit_count_key: 0,
                }
            )
            month_year_map[_date][item.type] = item.sum  # item.type will always satisfy TransactionType Enum
            month_year_map[_date][
                withdraw_count_key if item.type == TransactionType.WITHDRAW else deposit_count_key
            ] = item.count

        return sorted([flattened_result for flattened_result in month_year_map.values()], key=lambda k: k['date'])
