from datetime import date

from fastapi import APIRouter, HTTPException

from app import schemas
from app.storage import TransactionStorage

router = APIRouter(
    prefix='/transactions',
    tags=['transactions']
)


@router.get('/search', response_model=list[schemas.Transaction])
async def search_transactions(start_date: date | None = None, end_date: date | None = None):
    if start_date and end_date and start_date > end_date:
        raise HTTPException(status_code=400, detail='Start date cannot be greater than end date')
    return await TransactionStorage.search_transactions(start_date, end_date)
