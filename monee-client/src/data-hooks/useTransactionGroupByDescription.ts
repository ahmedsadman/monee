import axios from "axios";
import { useCallback } from "react";
import { Moment } from "moment";
import { useEffect, useState } from "react";
import { GroupedTransactionDescription } from "../common/types";

function useTransactionGroupByDescription(
  startDate: Moment | null,
  endDate: Moment | null,
  query: string = "",
  offset: number = 0,
  limit: number = 25
) {
  const [allTypes, setAllTypes] = useState<
    GroupedTransactionDescription[] | undefined
  >();
  const [deposits, setDeposits] = useState<
    GroupedTransactionDescription[] | undefined
  >();
  const [withdrawls, setWithdrawls] = useState<
    GroupedTransactionDescription[] | undefined
  >();

  const fetchGroupedByDescription = useCallback(() => {
    if (!startDate || !endDate) {
      return;
    }

    const params = {
      start_date: startDate.format("YYYY-MM-DD"),
      end_date: endDate.format("YYYY-MM-DD"),
      query,
      limit,
      offset,
    };

    axios
      .get("/api/transactions/grouped/description", { params })
      .then((resp) => {
        const { data }: { data: GroupedTransactionDescription[] } = resp;
        data.sort((a, b) => {
          if (a.sum < b.sum) {
            return 1;
          }

          if (a.sum > b.sum) {
            return -1;
          }

          return 0;
        });

        setAllTypes(resp.data);
        setDeposits(
          data.filter(
            (item: GroupedTransactionDescription) => item.type === "deposit"
          )
        );
        setWithdrawls(
          data.filter(
            (item: GroupedTransactionDescription) => item.type === "withdraw"
          )
        );
      });
  }, [startDate, endDate, offset, limit, query]);

  useEffect(() => {
    fetchGroupedByDescription();
  }, [fetchGroupedByDescription]);

  return { allTypes, deposits, withdrawls };
}

export default useTransactionGroupByDescription;
