from fastapi import FastAPI, Response, Request
from sqlalchemy.exc import DBAPIError
from app.db import session_factory, session_var, engine
from app import models
from app.routes import accounts

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(accounts.router)


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    with session_factory() as session:
        session_var.set(session)
        response = await call_next(request)
        try:
            session.commit()
        except DBAPIError as e:
            print(e)
            session.rollback()
    return response
