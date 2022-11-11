import os

db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')


class Config:
    SQLALCHEMY_DATABASE_URI = f'mysql+aiomysql://{db_user}:{db_password}@{db_host}:3306/{db_name}'
