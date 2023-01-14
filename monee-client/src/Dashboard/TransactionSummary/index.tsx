import { useState, useCallback } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Moment } from "moment";
import DateRangePicker from "../../common/components/DateRangePicker";
import useTransactionStatistics from "../../data-hooks/useTransactionStatistics";
import { formatMoneyAmount } from "../../common/utils";

function TransactionSummary() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const { statistics } = useTransactionStatistics(startDate, endDate);

  const handleDateRangeChange = useCallback(
    (startDate: Moment | null, endDate: Moment | null) => {
      setStartDate(startDate);
      setEndDate(endDate);
    },
    []
  );

  return (
    <Card>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, pb: 3 }}
          color="text.secondary"
          gutterBottom
        >
          Transaction Summary
        </Typography>
        <DateRangePicker onChange={handleDateRangeChange} />
        <Card sx={{ mt: 3 }} variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14, pb: 3 }}
              color="text.secondary"
              gutterBottom
            >
              Withdraw
            </Typography>
            <Typography variant="h5" component="div">
              {formatMoneyAmount(statistics?.withdraw.sum)}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 3 }} variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14, pb: 3 }}
              color="text.secondary"
              gutterBottom
            >
              Deposit
            </Typography>
            <Typography variant="h5" component="div">
              {formatMoneyAmount(statistics?.deposit.sum)}
            </Typography>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default TransactionSummary;
