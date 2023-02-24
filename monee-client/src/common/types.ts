export type Transaction = {
  amount: number;
  balance: number;
  uid: string;
  id: string;
  type: string;
  date: string;
};

// TODO: Give more specific naming
export type GroupedTransaction = {
  date: string;
  withdraw: number;
  deposit: number;
  withdraw_count: number;
  deposit_count: number;
};

export type GroupedTransactionDescription = {
  description: string;
  sum: string;
  count: number;
  type: "deposit" | "withdraw";
};

export type PlotData = {
  x: number | string;
  y: number;
};

export type Statistics = {
  withdraw: {
    sum: number;
    count: number;
  };
  deposit: {
    sum: number;
    count: number;
  };
};

export type Account = {
  id: number;
  bank_identifier: string;
  title: string;
};
