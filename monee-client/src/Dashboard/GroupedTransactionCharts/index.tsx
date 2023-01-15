import { useCallback, useState } from "react";
import { Moment } from "moment";
import { Card, CardContent, Box, Typography } from "@mui/material";
import useTransactionGroupByMonth from "../../data-hooks/useTransactionGroupByMonth";
import { GroupedTransaction } from "../../common/types";
import BarSeriesPlot from "../../common/components/BarSeriesPlot";
import DateRangePicker, {
  defaultPresetOptions,
} from "../../common/components/DateRangePicker";

function GroupedTransactionCharts() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const { groupedByMonthDeposits, groupedByMonthWithdrawls } =
    useTransactionGroupByMonth(startDate, endDate);

  const presetOptions = defaultPresetOptions.slice(1);
  presetOptions[presetOptions.length - 1].default = true;

  const getXYCoord = (data: GroupedTransaction[]) =>
    data.map((item) => ({
      x: `${item.year.toString().slice(2)}-${item.month}`,
      y: item.sum,
    }));

  const handleDateRangeChange = useCallback(
    (startDate: Moment | null, endDate: Moment | null) => {
      setStartDate(startDate);
      setEndDate(endDate);
    },
    []
  );

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, pb: 3 }}
          color="text.secondary"
          gutterBottom
        >
          Withdraw/Deposit by month
        </Typography>
        <Box sx={{ mb: 3, ml: 3 }}>
          <DateRangePicker
            onChange={handleDateRangeChange}
            presetOptions={presetOptions}
          />
        </Box>

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
