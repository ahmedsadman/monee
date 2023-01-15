import axios from "axios";
import { useCallback } from "react";
import { Moment } from "moment";
import { useEffect, useState } from "react";
import { GroupedTransaction } from "../common/types";

function useTransactionGroupByMonth(
  startDate: Moment | null,
  endDate: Moment | null
) {
  const [groupedByMonth, setGroupedByMonth] = useState<
    GroupedTransaction[] | undefined
  >();
  const [groupedByMonthWithdrawls, setGroupedByMonthWithdrawls] = useState<
    GroupedTransaction[] | undefined
  >();
  const [groupedByMonthDeposits, setGroupedByMonthDeposits] = useState<
    GroupedTransaction[] | undefined
  >();

  const fetchGroupedByMonth = useCallback(() => {
    if (!startDate || !endDate) {
      return;
    }

    const params = {
      start_date: startDate.format("YYYY-MM-DD"),
      end_date: endDate.format("YYYY-MM-DD"),
    };

    axios.get("/api/transactions/grouped/month", { params }).then((resp) => {
      const { data }: { data: GroupedTransaction[] } = resp;
      data.sort((a, b) => {
        if (a.month < b.month) {
          return -1;
        }

        if (a.month > b.month) {
          return 1;
        }

        return 0;
      });
      const withdrawls = resp.data.filter(
        (item: GroupedTransaction) => item.type === "withdraw"
      );
      const deposits = resp.data.filter(
        (item: GroupedTransaction) => item.type === "deposit"
      );
      setGroupedByMonth(resp.data);
      setGroupedByMonthDeposits(deposits);
      setGroupedByMonthWithdrawls(withdrawls);
    });
  }, [startDate, endDate]);

  useEffect(() => {
    fetchGroupedByMonth();
  }, [fetchGroupedByMonth]);

  return { groupedByMonth, groupedByMonthWithdrawls, groupedByMonthDeposits };
}

export default useTransactionGroupByMonth;
