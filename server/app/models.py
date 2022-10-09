from sqlalchemy import Column, String, Integer, Enum as EnumColumn
from app.enums import BankIdentifier
from app.db import Base


class Account(Base):
    __tablename__ = 'accounts'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50), nullable=False)
    account_no = Column(String(50), nullable=False)
    bank_identifier = Column(EnumColumn(BankIdentifier), nullable=False)
