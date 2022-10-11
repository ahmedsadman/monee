from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from contextvars import ContextVar
from app.config import Config


engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

session_factory = sessionmaker(bind=engine)
session_var: ContextVar = ContextVar('db_session')
session = session_var.get

Base = declarative_base()
