from pathlib import Path
from tempfile import NamedTemporaryFile

import aiofiles
from fastapi import UploadFile


async def save_upload_file_temp(upload_file: UploadFile) -> Path:
    upload_file_path = Path(upload_file.filename)
    temp_file = NamedTemporaryFile(delete=False, suffix=upload_file_path.suffix)

    async with aiofiles.open(temp_file.name, 'wb') as out_file:
        content = await upload_file.read()
        await out_file.write(content)

    return Path(temp_file.name)
