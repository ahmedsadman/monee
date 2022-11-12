import pytest
from pathlib import Path
from alembic.config import Config as AlembicConfig
from alembic.command import upgrade
from httpx import AsyncClient
from app.config import Config

TEST_DB_NAME = 'test_db.db'
TEST_DB_PATH = Path(f'./{TEST_DB_NAME}')


def run_migration():
    print(' -- STARTING MIGRATION -- ')
    inifile = str(Path('./alembic.ini').resolve())
    alembic_config = AlembicConfig(inifile)
    alembic_config.set_main_option('sqlalchemy.url', Config.SQLALCHEMY_DATABASE_URI)
    upgrade(alembic_config, 'head')
    print('-- MIGRATION COMPLETE --')


def pytest_configure():
    Config.SQLALCHEMY_DATABASE_URI = f'sqlite+aiosqlite:///{TEST_DB_NAME}?check_same_thread=false'
    run_migration()


def pytest_unconfigure():
    remove_db()


def remove_db():
    if TEST_DB_PATH.is_file():
        TEST_DB_PATH.unlink()


@pytest.fixture(autouse=True)
def async_client_setter():
    from app.main import app
    from .async_client import async_client_var

    async_client_var.set(AsyncClient(app=app, base_url="http://test"))
    yield


# TODO: For debug only, remove later
# @pytest.fixture(autouse=True)
# def log_db_engine_driver():
#     from app.db import engine
#     print('engine is', engine.driver)
