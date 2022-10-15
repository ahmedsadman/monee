import csv
from datetime import datetime
from pathlib import Path
from tempfile import NamedTemporaryFile

from app import schemas
from app.enums import TransactionType

from .config import ParserConfig, parser_configs


class BaseParser:
    def __init__(self, file_path: str, config: ParserConfig):
        self.file_path = file_path
        self.config = config

    def _read_statement(self, temp_filename):
        lines = None
        with open(self.file_path, 'r') as f:
            lines = f.readlines()
        parsed_lines = [lines[self.config.header_lindex]]
        parsed_lines += lines[self.config.transaction_start_lindex:len(lines) - self.config.transaction_end_offset]

        with open(temp_filename, 'w') as f:
            f.writelines(parsed_lines)

    def sanitize(self, data: str) -> str:
        data = data.strip()
        data = data.replace('`', '')
        return data

    def sanitize_amount(self, data: str) -> str:
        data = data.replace(',', '')
        data = data.replace('CR', '')
        return data

    def get_transactions(self) -> list[schemas.ParsedTransaction]:
        transactions = []

        read_temp_file = Path(NamedTemporaryFile(suffix="csv").name)
        str_path = read_temp_file.resolve()

        with open(str_path, 'w') as f:
            self._read_statement(str_path)

            with open(str_path, 'r') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    date = datetime.strptime(self.sanitize(row[self.config.date_colname]), self.config.date_parser)
                    type = TransactionType.WITHDRAW \
                        if row[self.config.withdraw_colname] not in ('-', '') else TransactionType.DEPOSIT
                    amount = row[self.config.withdraw_colname] \
                        if type == TransactionType.WITHDRAW else row[self.config.deposit_colname]

                    transactions.append(
                        schemas.ParsedTransaction(
                            date=date,
                            description=row[self.config.desc_colname],
                            type=type,
                            amount=float(self.sanitize_amount(amount)),
                            balance=float(self.sanitize_amount(row[self.config.balance_colname]))
                        )
                    )

            read_temp_file.unlink()

        return transactions


def get_parser(bank_identifier: str, filepath) -> BaseParser:
    if bank_identifier not in parser_configs:
        raise
    return BaseParser(filepath, parser_configs[bank_identifier])
