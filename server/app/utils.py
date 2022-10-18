import hashlib
from pathlib import Path
from tempfile import NamedTemporaryFile

import aiofiles
from fastapi import UploadFile

from app import schemas


async def save_upload_file_temp(upload_file: UploadFile) -> Path:
    upload_file_path = Path(upload_file.filename)
    temp_file = NamedTemporaryFile(delete=False, suffix=upload_file_path.suffix)

    async with aiofiles.open(temp_file.name, 'wb') as out_file:
        content = await upload_file.read()
        await out_file.write(content)

    return Path(temp_file.name)


def calculate_transaction_uid(t: schemas.ParsedTransaction | schemas.TransactionCreate, account_id: int) -> str:
    str_to_hash = f'{account_id}-{t.date}-{t.amount}-{t.type}-{t.balance}-{t.description}'
    return hashlib.md5(str_to_hash.encode('utf-8')).hexdigest()
