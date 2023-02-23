from datetime import date

from fastapi import APIRouter, HTTPException

from app import schemas
from app.enums import TransactionType
from app.storage import TransactionStorage

router = APIRouter(
    prefix='/transactions',
    tags=['transactions']
)


@router.get('/search', response_model=schemas.TransactionSearch)
async def search_transactions(
        start_date: date | None = None,
        end_date: date | None = None,
        query: str | None = None,
        offset: int = 0, limit: int = 10
        ):
    if start_date and end_date and start_date > end_date:
        raise HTTPException(status_code=400, detail='Start date cannot be greater than end date')
    result = await TransactionStorage.search_transactions(start_date, end_date, query, offset, limit)

    return {
        'count': result[1],
        'results': result[0]
    }


@router.get('/statistics', response_model=schemas.Statistics)
async def get_statistics(start_date: date | None = None, end_date: date | None = None):
    if start_date and end_date and start_date > end_date:
        raise HTTPException(status_code=400, detail='Start date cannot be greater than end date')

    db_stats = await TransactionStorage.get_statistics(start_date, end_date)

    return {
        'withdraw': db_stats[0] if len(db_stats) > 0 else dict(),
        'deposit': db_stats[1] if len(db_stats) > 1 else dict(),
    }


@router.get('/grouped/description', response_model=list[schemas.GroupedTransactionDescription])
async def get_grouped_transactions_by_description(
                                    start_date: date | None = None, end_date: date | None = None,
                                    transaction_type: TransactionType | None = None,
                                    query: str | None = None,
                                    offset: int = 0, limit: int = 10
                                ):

    if start_date and end_date and start_date > end_date:
        raise HTTPException(status_code=400, detail='Start date cannot be greater than end date')

    db_stats = await TransactionStorage.get_grouped_by_desciption(start_date, end_date,
                                                                  transaction_type, query, offset, limit)
    return db_stats


@router.get('/grouped/month', response_model=list[schemas.GroupedTransactionMonth])
async def get_grouped_transactions_by_month(
                                    start_date: date | None = None, end_date: date | None = None,
                                ):

    if start_date and end_date and start_date > end_date:
        raise HTTPException(status_code=400, detail='Start date cannot be greater than end date')

    db_stats = await TransactionStorage.get_grouped_by_month(start_date, end_date)
    return db_stats
