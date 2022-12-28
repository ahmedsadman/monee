import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Moment } from "moment";
import DateRangePicker from "./DateRangePicker";
import useTransactionStatistics from "../../data-hooks/useTransactionStatistics";

function TransactionSummary() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const { statistics } = useTransactionStatistics(startDate, endDate);

  const handleDateRangeChange = (
    startDate: Moment | null,
    endDate: Moment | null
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          sx={{ fontSize: 14, pb: 3 }}
          color="text.secondary"
          gutterBottom
        >
          Transaction Summary
        </Typography>
        <DateRangePicker
          onChange={handleDateRangeChange}
          startValue={startDate}
          endValue={endDate}
        />
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, pb: 3 }}
              color="text.secondary"
              gutterBottom
            >
              Withdraw
            </Typography>
            <Typography variant="h5" component="div">
              {statistics?.withdraw.sum || ""}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, pb: 3 }}
              color="text.secondary"
              gutterBottom
            >
              Deposit
            </Typography>
            <Typography variant="h5" component="div">
              {statistics?.deposit.sum || ""}
            </Typography>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default TransactionSummary;
