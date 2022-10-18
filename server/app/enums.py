from enum import Enum


class TransactionType(str, Enum):
    WITHDRAW = 'withdraw'
    DEPOSIT = 'deposit'
