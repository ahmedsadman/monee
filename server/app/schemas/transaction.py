from datetime import date

from pydantic import BaseModel, validator

from app.enums import TransactionType


class TransactionBase(BaseModel):
    description: str
    amount: float
    date: date
    type: TransactionType
    balance: float

    @validator('description')
    def truncate_description(cls, v):
        # limit character to make it valid for db field
        return v[:199]


class ParsedTransaction(TransactionBase):
    pass


class TransactionCreate(ParsedTransaction):
    uid: str
    account_id: int


class Transaction(TransactionCreate):
    id: int

    class Config:
        orm_mode = True
