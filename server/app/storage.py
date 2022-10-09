from app import schemas
from app.db import session
from app import models


class AccountStorage:
    @staticmethod
    def create_account(account: schemas.AccountCreate):
        db_account = models.Account(**account.dict())
        session().add(db_account)
        session().flush()
        session().refresh(db_account)
        return db_account
