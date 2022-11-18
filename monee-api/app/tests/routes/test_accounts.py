import pytest
from app.storage import AccountStorage
from app import schemas


mock_account_data = {
    'title': 'Test',
    'account_no': '123',
    'bank_identifier': 'scb'
}


@pytest.fixture()
async def account():
    from app.db import session_factory

    async with session_factory() as session:
        acc = await AccountStorage(session).create_account(schemas.AccountCreate.parse_obj(mock_account_data))
        await session.commit()
        await session.refresh(acc)

    yield acc


async def test_create_account(async_client):
    response = await async_client.post('/accounts', json=mock_account_data)
    assert response.status_code == 201

    res_json = response.json()
    assert res_json['title'] == mock_account_data['title']


async def test_list_account(async_client, account):
    response = await async_client.get('/accounts')
    assert response.status_code == 200

    res_json = response.json()
    assert len(res_json) == 1
    assert res_json[0]['title'] == account.title
