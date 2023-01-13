import pytest
from datetime import date
from app.tests.async_client import async_client
from app.storage import TransactionStorage
from app.enums import TransactionType
from app import schemas
from app import utils


@pytest.fixture()
async def transactions():
    from app.db import session

    dates = [
        date(2022, 1, 1),
        date(2022, 1, 2),
        date(2022, 1, 2),
        date(2022, 1, 3),
        date(2022, 2, 2)
    ]
    amounts = [100, 200, 150, 300, 1000]

    transactions_to_create = []

    for _date, amount in zip(dates, amounts):
        # TODO: Improve the test set by adding deposits
        data = {
            'description': 'test-description',
            'amount': amount,
            'date': _date,
            'type': TransactionType.WITHDRAW,
            'balance': 0,
        }
        parsed_transaction = schemas.ParsedTransaction.parse_obj(data.copy())
        data.update({
            'account_id': 1,
            'uid': utils.calculate_transaction_uid(parsed_transaction, 1)
        })
        transactions_to_create.append(schemas.TransactionCreate.parse_obj(data))

    db_transactions = await TransactionStorage.add_transactions(transactions_to_create)
    await session().commit()

    for t in db_transactions:
        await session().refresh(t)

    yield db_transactions


async def test_search_transactions(transactions):
    params = {
        'start_date': '2022-01-02',
        'end_date': '2022-01-03'
    }

    response = await async_client().get('/transactions/search', params=params)
    assert response.status_code == 200

    res_json = response.json()
    assert len(res_json) == 3

    for record in res_json:
        assert record['date'] >= params['start_date']
        assert record['date'] <= params['end_date']


async def test_get_grouped_by_month():
    # SQLite (the test db) does not support func.year, need to find something equivalent
    pass
