from pydantic import BaseModel
from app.enums import BankIdentifier


class AccountBase(BaseModel):
    title: str
    account_no: str
    bank_identifier: BankIdentifier


class AccountCreate(AccountBase):
    pass


class Account(AccountBase):
    id: str

    class Config:
        orm_mode = True
