from fastapi import APIRouter, UploadFile
from pathlib import Path
from app import utils

from app import schemas
from app.storage import AccountStorage

router = APIRouter(
    prefix='/accounts',
    tags=['accounts']
)


@router.post('/', status_code=201, response_model=schemas.Account)
async def create_account(account: schemas.AccountCreate):
    db_account = await AccountStorage.create_account(account)
    return db_account


@router.get('/', response_model=list[schemas.Account])
async def list_all_accounts():
    return await AccountStorage.list_all_accounts()


@router.post('/upload-statement')
async def upload_statement(file: UploadFile):
    saved_file: Path = await utils.save_upload_file_temp(file)
    return {'path': saved_file.name}
