from pydantic import BaseModel


class AccountBase(BaseModel):
    title: str
    account_no: str
    bank_identifier: str


class AccountCreate(AccountBase):
    pass


class Account(AccountBase):
    id: int

    class Config:
        orm_mode = True
