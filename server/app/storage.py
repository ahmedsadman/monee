import hashlib

from fastapi import HTTPException
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
        db_transactions = [models.Transaction(**transaction.dict()) for transaction in transactions]
        session().add_all(db_transactions)

    @staticmethod
    def calculate_transaction_uid(t: schemas.ParsedTransaction, account_id: int) -> str:
        # calcualte an unique id for transaction
        str_to_hash = f'{account_id}-{t.date}-{t.amount}-{t.type}-{t.balance}-{t.description}'
        return hashlib.md5(str_to_hash.encode('utf-8')).hexdigest()
