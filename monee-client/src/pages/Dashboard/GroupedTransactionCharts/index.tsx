import { useCallback, useState } from "react";
import { Moment } from "moment";
import { Card, CardContent, Box, Typography } from "@mui/material";
import useTransactionGroupByMonth from "../../../data-hooks/useTransactionGroupByMonth";
import BarSeriesPlot from "../../../common/components/BarSeriesPlot";
import DateRangePicker, {
  defaultPresetOptions,
} from "../../../common/components/DateRangePicker";

function GroupedTransactionCharts() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const { groupedByMonth } = useTransactionGroupByMonth(startDate, endDate);

  const presetOptions = defaultPresetOptions.slice(1);
  presetOptions[presetOptions.length - 2].default = true;

  const handleDateRangeChange = useCallback(
    (startDate: Moment | null, endDate: Moment | null) => {
      setStartDate(startDate);
      setEndDate(endDate);
    },
    []
  );

  const barProps = [
    { dataKey: "deposit", color: "#82ca9d" },
    { dataKey: "withdraw", color: "#8884d8" },
  ];

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

        {/* TODO: Fix this hack of using object[] */}
        <BarSeriesPlot
          data={groupedByMonth as object[]}
          barProps={barProps}
          xAxisKey="date"
        />
      </CardContent>
    </Card>
  );
}

export default GroupedTransactionCharts;
