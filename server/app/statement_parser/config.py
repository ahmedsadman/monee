from dataclasses import dataclass


@dataclass
class ParserConfig:
    bank_name: str
    transaction_start_lindex: int
    transaction_end_offset: int
    header_lindex: int
    date_colname: str
    desc_colname: str
    withdraw_colname: str
    deposit_colname: str
    balance_colname: str
    date_parser: str


parser_configs = {
    'abbank': ParserConfig(
                bank_name='AB Bank',
                transaction_start_lindex=3,
                transaction_end_offset=7,
                header_lindex=1,
                date_colname='POST DATE',
                desc_colname='PARTICULARS',
                withdraw_colname='DEBIT',
                deposit_colname='CREDIT',
                balance_colname='BALANCE',
                date_parser='%d%b%y'
            ),
    'scb': ParserConfig(
                bank_name='SCB',
                transaction_start_lindex=5,
                transaction_end_offset=0,
                header_lindex=3,
                date_colname='Date',
                desc_colname='Description',
                withdraw_colname='Withdrawal',
                deposit_colname='Deposit',
                balance_colname='Balance',
                date_parser='%d/%m/%Y'
            )
}
