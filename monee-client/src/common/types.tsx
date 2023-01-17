export type Transaction = {
  amount: number;
  balance: number;
  uid: string;
  id: string;
  type: string;
  date: string;
};

export type GroupedTransaction = {
  date: string;
  withdraw: number;
  deposit: number;
  withdraw_count: number;
  deposit_count: number;
};

export type PlotData = {
  x: number | string;
  y: number;
};
