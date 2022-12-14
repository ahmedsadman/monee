from contextvars import ContextVar

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config import Config

engine = create_async_engine(Config.SQLALCHEMY_DATABASE_URI)

session_factory = sessionmaker(bind=engine, class_=AsyncSession)
session_var: ContextVar = ContextVar('db_session')
session = session_var.get

Base = declarative_base()
