import pytest
from pathlib import Path
from alembic.config import Config as AlembicConfig
from alembic.command import upgrade
from httpx import AsyncClient
from app.config import Config
import sqlalchemy as sa

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


async def test_db_session():
    from app.db import session_factory
    from app import models

    async with session_factory() as session:
        yield session
        await session.execute(sa.delete(models.Account))
        await session.execute(sa.delete(models.Transaction))
        await session.commit()


@pytest.fixture()
async def async_client():
    from app.main import app
    from app.dependency import db_session

    app.dependency_overrides[db_session] = test_db_session

    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac
