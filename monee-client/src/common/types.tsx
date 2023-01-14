export type Transaction = {
  amount: number;
  balance: number;
  uid: string;
  id: string;
  type: string;
  date: string;
};

export type GroupedTransaction = {
  sum: number;
  type: string;
  month: number;
};
