from fastapi import FastAPI
from app.routes import accounts, transactions

app = FastAPI()

app.include_router(accounts.router)
app.include_router(transactions.router)
