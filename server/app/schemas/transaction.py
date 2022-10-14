from datetime import datetime

from pydantic import BaseModel

from app.enums import TransactionType


class TransactionBase(BaseModel):
    description: str
    amount: float
    date: datetime
    type: TransactionType
    balance: float


class ParsedTransaction(TransactionBase):
    pass
