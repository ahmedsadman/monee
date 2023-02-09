import axios from "axios";
import { useEffect, useState } from "react";
import { Moment } from "moment";

function useTransactions(
  startDate: Moment | null,
  endDate: Moment | null,
  offset: number = 0,
  limit: number = 100
) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    const startDateString = startDate.format("YYYY-MM-DD");
    const endDateString = endDate.format("YYYY-MM-DD");

    const params = {
      start_date: startDateString,
      end_date: endDateString,
      offset,
      limit,
    };

    axios
      .get("/api/transactions/search", { params })
      .then((res) => setTransactions(res.data));
  }, [startDate, endDate, offset, limit]);

  return { transactions };
}

export default useTransactions;
