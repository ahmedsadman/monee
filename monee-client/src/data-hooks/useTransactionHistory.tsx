import axios from "axios";
import { useEffect, useState } from "react";
import { Transaction } from "../common/types";

function useTransactionHistory() {
  const [transactionHistory, setTransactionHistory] = useState<
    Transaction[] | undefined
  >();

  useEffect(() => {
    const params = {
      start_date: "2022-8-1",
      end_date: "2022-12-30",
    };

    axios
      .get("/api/transactions/search", { params })
      .then((resp) => setTransactionHistory(resp.data));
  }, []);

  return { transactionHistory };
}

export default useTransactionHistory;
