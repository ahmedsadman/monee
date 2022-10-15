import hashlib
from datetime import date

from fastapi import HTTPException
from sqlalchemy import desc, func
from sqlalchemy.future import select

from app import models, schemas
from app.db import session


class AccountStorage:
    @staticmethod
    async def create_account(account: schemas.AccountCreate) -> models.Account:
        db_account = models.Account(**account.dict())
        session().add(db_account)
        await session().flush()
        await session().refresh(db_account)
        return db_account

    @staticmethod
    async def list_all_accounts() -> list[models.Account]:
        statement = select(models.Account)
        accounts = await session().scalars(statement)
        return accounts.all()

    @staticmethod
    async def get_by_id(id: int) -> models.Account:
        account = await session().get(models.Account, id)

        if not account:
            raise HTTPException(status_code=404, detail="Account not found")

        return account


class TransactionStorage:
    @staticmethod
    async def add_transactions(transactions: list[schemas.TransactionCreate]):
        to_add = []

        for transaction in transactions:
            calculated_uid = TransactionStorage.calculate_transaction_uid(transaction, transaction.account_id)
            if not await TransactionStorage.transaction_exists(calculated_uid):
                to_add.append(transaction)

        db_transactions = [models.Transaction(**transaction.dict()) for transaction in to_add]
        session().add_all(db_transactions)

    @staticmethod
    async def transaction_exists(uid: str):
        statement = select(models.Transaction).where(models.Transaction.uid == uid)
        result = await session().scalars(statement)
        return result.first() is not None

    # TODO: This is not storage related function, move to someplace else
    @staticmethod
    def calculate_transaction_uid(t: schemas.ParsedTransaction | schemas.TransactionCreate, account_id: int) -> str:
        str_to_hash = f'{account_id}-{t.date}-{t.amount}-{t.type}-{t.balance}-{t.description}'
        return hashlib.md5(str_to_hash.encode('utf-8')).hexdigest()

    @staticmethod
    async def search_transactions(
            start_date: date | None,
            end_date: date | None,
            description: str | None
            ) -> list[models.Transaction]:
        query_filters = []

        if start_date:
            query_filters.append(models.Transaction.date >= start_date)

        if end_date:
            query_filters.append(models.Transaction.date <= end_date)

        if description:
            query_filters.append(models.Transaction.description == description)

        statement = select(models.Transaction).where(*query_filters)
        results = await session().scalars(statement)
        return results.all()

    @staticmethod
    async def get_statistics(start_date: date | None, end_date: date | None) -> list:
        query_filters = []

        if start_date:
            query_filters.append(models.Transaction.date >= start_date)

        if end_date:
            query_filters.append(models.Transaction.date <= end_date)

        stmt_simple = select(func.sum(models.Transaction.amount), func.count(models.Transaction.amount)) \
            .group_by(models.Transaction.type) \
            .where(*query_filters)

        stmt_group = select(models.Transaction.description, models.Transaction.type,
                            func.sum(models.Transaction.amount), func.count(models.Transaction.amount)) \
            .group_by(models.Transaction.description, models.Transaction.type) \
            .order_by(desc(func.sum(models.Transaction.amount))) \
            .where(*query_filters)

        # session.execute returns all columns
        # session.execute can be used for ORM instances, but need to add some more code to get the instance column.
        # session.scalar returns a single column, the column value being the ORM instance
        # session.scalar is useful when selecting only ORM entities. It's a convenient version of session.execute
        # session.execute is required when we're dealing with non-ORM instances,
        # like here we're using aggregate functions
        results_simple = await session().execute(stmt_simple)
        results_group = await session().execute(stmt_group)
        return [results_simple.all(), results_group.all()]
