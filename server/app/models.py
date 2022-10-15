from sqlalchemy import Column, Date, Enum, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db import Base
from app.enums import TransactionType


class Account(Base):
    __tablename__ = 'accounts'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50), nullable=False)
    account_no = Column(String(50), nullable=False)
    bank_identifier = Column(String(50), nullable=False)

    transactions = relationship('Transaction', back_populates='account')


class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey('accounts.id'))
    uid = Column(String(60), nullable=False, index=True, unique=True)
    description = Column(String(200), nullable=True)
    amount = Column(Float, nullable=False)
    date = Column(Date, nullable=False, index=True)
    type = Column(Enum(TransactionType), nullable=False, index=True)
    balance = Column(Float, nullable=False)

    account = relationship('Account', back_populates='transactions')
