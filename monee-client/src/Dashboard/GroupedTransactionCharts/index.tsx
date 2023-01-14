import { Card, CardContent } from "@mui/material";
import useTransactionGroupByMonth from "../../data-hooks/useTransactionGroupByMonth";
import { GroupedTransaction } from "../../common/types";
import BarSeriesPlot from "../../common/components/BarSeriesPlot";

function GroupedTransactionCharts() {
  const { groupedByMonthDeposits, groupedByMonthWithdrawls } =
    useTransactionGroupByMonth();

  const getXYCoord = (data: GroupedTransaction[]) =>
    data.map((item) => ({
      x: `${item.year.toString().slice(2)}-${item.month}`,
      y: item.sum,
    }));

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <BarSeriesPlot
          series={[
            {
              title: "Deposit",
              color: "#140F2D",
              data: getXYCoord(groupedByMonthDeposits || []),
            },
            {
              title: "Withdraw",
              color: "#4464ad",
              data: getXYCoord(groupedByMonthWithdrawls || []),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}

export default GroupedTransactionCharts;
