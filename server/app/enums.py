from enum import Enum


class BankIdentifier(str, Enum):
    ABBANK = 'abbank'
    SCB = 'scb'


class TransactionType(str, Enum):
    WITHDRAW = 'widthdraw'
    DEPOSIT = 'deposit'
