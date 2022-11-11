import pytest
from pathlib import Path
from httpx import AsyncClient
from app.config import Config


# def pytest_configure():
#     Config.SQLALCHEMY_DATABASE_URI = 'sqlite+aiosqlite:///test_db.db?check_same_thread=false'


# def pytest_unconfigure():
#     remove_db()


# def remove_db():
#     test_db_path = Path('./test_db.db')

#     if test_db_path.is_file():
#         test_db_path.unlink()


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
