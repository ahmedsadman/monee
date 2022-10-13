from fastapi import FastAPI, Request, Response
from sqlalchemy.exc import DBAPIError

from app import models
from app.db import engine, session_factory, session_var
from app.routes import accounts

app = FastAPI()

app.include_router(accounts.router)


# TODO: Cleanup once Alembic migration is configured
async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)


# TODO: Cleanup once Alembic migration is configured
@app.on_event("startup")
async def startup():
    await init_models()


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    async with session_factory() as session:  # type: ignore
        session_var.set(session)
        response = await call_next(request)
        try:
            await session.commit()
        except DBAPIError as e:
            print(e)
            await session.rollback()
    return response
