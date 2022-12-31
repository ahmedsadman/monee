import axios from "axios";
import { Moment } from "moment";
import { useEffect, useState } from "react";

function useTransactionStatistics(
  startDate: Moment | null,
  endDate: Moment | null
) {
  const [statistics, setStatistics] = useState<Statistics>();

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    const startDateString = startDate.format("YYYY-MM-DD");
    const endDateString = endDate.format("YYYY-MM-DD");

    axios
      .get(
        `/api/transactions/statistics?start_date=${startDateString}&end_date=${endDateString}`
      )
      .then((res) => setStatistics(res.data));
  }, [startDate, endDate]);

  return { statistics };
}

// TODO: Move to common types
type Statistics = {
  withdraw: {
    sum: number;
    count: number;
  };
  deposit: {
    sum: number;
    count: number;
  };
};

export default useTransactionStatistics;
