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
    @validator('description')
    def truncate_description(cls, v):
        x = ' '.join(v.split())
        return x[:199]

    @validator('amount', 'balance')
    def round_amount(cls, v):
        return round(v, 2)


class TransactionCreate(ParsedTransaction):
    uid: str
    account_id: int


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


class GroupedTransactionMonth(BaseModel):
    withdraw: float
    deposit: float
    withdraw_count: int
    deposit_count: int
    date: str

    @validator('withdraw', 'deposit')
    def round_amount(cls, v):
        return round(v, 2)


class TransactionSearch(BaseModel):
    results: list[Transaction]
    count: int


class Statistics(BaseModel):
    withdraw: StatisticsMeta
    deposit: StatisticsMeta
