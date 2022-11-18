from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config import Config

engine = create_async_engine(Config.SQLALCHEMY_DATABASE_URI)

session_factory = sessionmaker(bind=engine, class_=AsyncSession)

Base = declarative_base()
