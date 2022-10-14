from sqlalchemy import Column
from sqlalchemy import Enum as EnumColumn
from sqlalchemy import Integer, String

from app.db import Base


class Account(Base):
    __tablename__ = 'accounts'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50), nullable=False)
    account_no = Column(String(50), nullable=False)
    bank_identifier = Column(String(50), nullable=False)
