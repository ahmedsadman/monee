from fastapi import APIRouter
from app import schemas
from app.storage import AccountStorage


router = APIRouter(
    prefix='/accounts',
    tags=['accounts']
)


@router.post('/', status_code=201)
def create_account(account: schemas.AccountCreate):
    db_account = AccountStorage.create_account(account)
    return db_account
