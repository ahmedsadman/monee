from datetime import date

from fastapi import HTTPException
from sqlalchemy import desc, func
from sqlalchemy.orm import Session
from sqlalchemy.future import select

from app import models, schemas
from app.enums import TransactionType
from app.utils import calculate_transaction_uid, commit_or_rollback


class AccountStorage:
    def __init__(self, session: Session):
        self.session = session

    async def create_account(self, account: schemas.AccountCreate) -> models.Account:
        db_account = models.Account(**account.dict())
        self.session.add(db_account)
        await commit_or_rollback(self.session)
        await self.session.refresh(db_account)
        return db_account

    async def list_all_accounts(self) -> list[models.Account]:
        statement = select(models.Account)
        accounts = await self.session.scalars(statement)
        return accounts.all()

    async def get_by_id(self, id: int) -> models.Account:
        account = await self.session.get(models.Account, id)

        if not account:
            raise HTTPException(status_code=404, detail="Account not found")

        return account


class TransactionStorage:
    def __init__(self, session: Session):
        self.session = session

    def get_date_filters(start_date: date | None, end_date: date | None) -> list:
        query_filters = []

        if start_date:
            query_filters.append(models.Transaction.date >= start_date)

        if end_date:
            query_filters.append(models.Transaction.date <= end_date)

        return query_filters

    async def add_transactions(self, transactions: list[schemas.TransactionCreate]):
        to_add = []

        for transaction in transactions:
            calculated_uid = calculate_transaction_uid(transaction, transaction.account_id)
            if not await TransactionStorage.transaction_exists(calculated_uid):
                to_add.append(transaction)

        db_transactions = [models.Transaction(**transaction.dict()) for transaction in to_add]
        self.session.add_all(db_transactions)

    async def transaction_exists(self, uid: str):
        statement = select(models.Transaction).where(models.Transaction.uid == uid)
        result = await self.session.scalars(statement)
        return result.first() is not None

    async def search_transactions(
            self,
            start_date: date | None,
            end_date: date | None,
            description: str | None
            ) -> list[models.Transaction]:
        query_filters = self.get_date_filters(start_date, end_date)

        if description:
            query_filters.append(models.Transaction.description == description)

        statement = select(models.Transaction).where(*query_filters)
        results = await self.session.scalars(statement)
        return results.all()

    async def get_statistics(self, start_date: date | None, end_date: date | None) -> list:
        query_filters = self.get_date_filters(start_date, end_date)

        stmt = select(func.sum(models.Transaction.amount), func.count(models.Transaction.amount)) \
            .group_by(models.Transaction.type) \
            .where(*query_filters)

        # session.execute returns all columns
        # session.execute can be used for ORM instances, but need to add some more code to get the instance column.
        # session.scalar returns a single column, the column value being the ORM instance
        # session.scalar is useful when selecting only ORM entities. It's a convenient version of session.execute
        # session.execute is required when we're dealing with non-ORM instances,
        # like here we're using aggregate functions
        results = await self.session.execute(stmt)
        return results.all()

    async def get_grouped_by_desciption(self, start_date: date | None, end_date: date | None,
                                        transaction_type: TransactionType | None) -> list:

        query_filters = self.get_date_filters(start_date, end_date)

        if transaction_type:
            query_filters.append(models.Transaction.type == transaction_type)

        stmt = select(
                    models.Transaction.description, models.Transaction.type,
                    func.sum(models.Transaction.amount), func.count(models.Transaction.amount)
                ) \
            .group_by(models.Transaction.description, models.Transaction.type) \
            .order_by(desc(func.sum(models.Transaction.amount))) \
            .where(*query_filters)

        results = await self.session.execute(stmt)
        return results.all()
