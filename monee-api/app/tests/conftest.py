from pathlib import Path
from app.config import Config


def pytest_configure():
    Config.SQLALCHEMY_DATABASE_URI = 'sqlite+aiosqlite:///test_db.db?check_same_thread=false'


def pytest_unconfigure():
    remove_db()


def remove_db():
    test_db_path = Path('./test_db.db')

    if test_db_path:
        test_db_path.unlink()
