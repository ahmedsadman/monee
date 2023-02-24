import asyncio
from pathlib import Path

from fastapi import APIRouter, UploadFile

from app import schemas, utils
from app.statement_parser.parser import get_parser
from app.storage import AccountStorage, TransactionStorage

router = APIRouter(
    prefix='/accounts',
    tags=['accounts']
)


@router.post('', status_code=201, response_model=schemas.Account)
async def create_account(account: schemas.AccountCreate):
    db_account = await AccountStorage.create_account(account)
    return db_account


@router.get('', response_model=list[schemas.Account])
async def list_all_accounts():
    return await AccountStorage.list_all_accounts()


@router.post('/{account_id}/upload-statement')
async def upload_statement(account_id: int, file: UploadFile):
    saved_file: Path = await utils.save_upload_file_temp(file)
    db_account = await AccountStorage.get_by_id(account_id)
    account = schemas.Account.from_orm(db_account)

    try:
        parser = get_parser(account.bank_identifier, saved_file.resolve())
        parsed_transactions: list[schemas.ParsedTransaction] = await asyncio.to_thread(parser.get_transactions)
        transactions: list[schemas.TransactionCreate] = [
                            schemas.TransactionCreate(
                                **transaction.dict(),
                                uid=utils
                                .calculate_transaction_uid(transaction, account_id), account_id=account_id
                            )
                            for transaction in parsed_transactions
                    ]
        await TransactionStorage.add_transactions(transactions)
        return {'message': 'OK'}
    except Exception as e:
        print(e)
        return {'message': 'An error occured'}, 400
    finally:
        saved_file.unlink()
