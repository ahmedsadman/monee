from datetime import date

from pydantic import BaseModel, validator

from app.enums import TransactionType


class TransactionBase(BaseModel):
    description: str
    amount: float
    date: date
    type: TransactionType
    balance: float


class ParsedTransaction(TransactionBase):
    pass


class TransactionCreate(ParsedTransaction):
    uid: str
    account_id: int

    @validator('description')
    def truncate_description(cls, v):
        x = ' '.join(v.split())
        return x[:199]

    @validator('amount')
    def round_amount(cls, v):
        return round(v, 2)

    @validator('balance')
    def round_balance(cls, v):
        return round(v, 2)


class Transaction(TransactionCreate):
    id: int

    class Config:
        orm_mode = True


class StatisticsMeta(BaseModel):
    sum: float = 0
    count: int = 0

    @validator('sum')
    def round_sum(cls, v):
        return round(v, 2)


class GroupedTransactionDescription(StatisticsMeta):
    description: str
    type: TransactionType


class GroupedTransactionMonth(StatisticsMeta):
    type: TransactionType
    year: int
    month: int


class Statistics(BaseModel):
    withdraw: StatisticsMeta
    deposit: StatisticsMeta
