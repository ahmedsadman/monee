import axios from "axios";
import { useEffect, useState } from "react";
import { GroupedTransaction } from "../common/types";

function useTransactionGroupByMonth() {
  const [groupedByMonth, setGroupedByMonth] = useState<
    GroupedTransaction[] | undefined
  >();
  const [groupedByMonthWithdrawls, setGroupedByMonthWithdrawls] = useState<
    GroupedTransaction[] | undefined
  >();
  const [groupedByMonthDeposits, setGroupedByMonthDeposits] = useState<
    GroupedTransaction[] | undefined
  >();

  const fetchGroupedByMonth = () => {
    const params = {
      start_date: "2022-1-1",
      end_date: "2022-12-30",
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
        (item: GroupedTransaction) => item.type == "withdraw"
      );
      const deposits = resp.data.filter(
        (item: GroupedTransaction) => item.type == "deposit"
      );
      setGroupedByMonth(resp.data);
      setGroupedByMonthDeposits(deposits);
      setGroupedByMonthWithdrawls(withdrawls);
    });
  };

  useEffect(() => {
    fetchGroupedByMonth();
  }, []);

  return { groupedByMonth, groupedByMonthWithdrawls, groupedByMonthDeposits };
}

export default useTransactionGroupByMonth;
