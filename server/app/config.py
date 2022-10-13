import os

db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')


class Config:
    SQLALCHEMY_DATABASE_URI = f'postgresql+asyncpg://{db_user}:{db_password}@{db_host}:5432/{db_name}'
