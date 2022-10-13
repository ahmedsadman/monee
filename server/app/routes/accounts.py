from pathlib import Path

from fastapi import APIRouter, UploadFile

from app import schemas, utils
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


@router.post('/{account_id}/upload-statement')
async def upload_statement(account_id: int, file: UploadFile):
    saved_file: Path = await utils.save_upload_file_temp(file)

    try:
        # process the transactions
        pass
    except Exception as e:
        print(e)
        return {'message': 'An error occured'}
    finally:
        saved_file.unlink()

    return {'message': 'OK'}
