import { Card, CardContent, Box } from "@mui/material";
import useTransactionGroupByMonth from "../../data-hooks/useTransactionGroupByMonth";
import {
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  FlexibleWidthXYPlot,
} from "react-vis";
import { GroupedTransaction } from "../../common/types";

// TODO: Rename it to TransactionChart
function TransactionHistory() {
  const { groupedByMonthDeposits, groupedByMonthWithdrawls } =
    useTransactionGroupByMonth();

  const getXYCoord = (data: GroupedTransaction[]) =>
    data.map((item) => ({ x: item.month, y: item.sum }));
  const withdrawColor = "#4464ad";
  const depositColor = "#140F2D";

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box
          sx={{
            ml: 3.5,
            fontSize: "0.8em",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            width: 200,
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: withdrawColor,
                width: 10,
                height: 10,
                mr: 1,
              }}
            ></Box>
            <span>Withdraw</span>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: depositColor,
                width: 10,
                height: 10,
                mr: 1,
              }}
            ></Box>
            <span>Deposit</span>
          </Box>
        </Box>

        <FlexibleWidthXYPlot
          xType="ordinal"
          height={300}
          margin={{ left: 100, right: 100 }}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries
            data={getXYCoord(groupedByMonthDeposits || [])}
            color={depositColor}
            barWidth={0.8}
          />
          <VerticalBarSeries
            barWidth={0.8}
            color={withdrawColor}
            data={getXYCoord(groupedByMonthWithdrawls || [])}
          />
        </FlexibleWidthXYPlot>
      </CardContent>
    </Card>
  );
}

export default TransactionHistory;
