from app.db import session_factory


async def db_session():
    async with session_factory() as session:
        yield session
