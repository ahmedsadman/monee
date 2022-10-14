from enum import Enum


class TransactionType(str, Enum):
    WITHDRAW = 'widthdraw'
    DEPOSIT = 'deposit'
