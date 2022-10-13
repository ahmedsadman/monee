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
