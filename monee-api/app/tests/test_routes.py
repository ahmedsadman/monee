import pytest
from .async_client import async_client


@pytest.mark.asyncio
async def test_main():
    response = await async_client().get('/accounts')
    print(response.json())
    assert response.status_code == 200
