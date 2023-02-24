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
        if (a.date < b.date) {
          return -1;
        }

        if (a.date > b.date) {
          return 1;
        }

        return 0;
      });

      setGroupedByMonth(resp.data);
    });
  }, [startDate, endDate]);

  useEffect(() => {
    fetchGroupedByMonth();
  }, [fetchGroupedByMonth]);

  return { groupedByMonth };
}

export default useTransactionGroupByMonth;
