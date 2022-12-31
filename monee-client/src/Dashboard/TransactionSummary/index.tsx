import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import moment, { Moment } from "moment";
import DateRangePicker from "./DateRangePicker";
import useTransactionStatistics from "../../data-hooks/useTransactionStatistics";
import { formatMoneyAmount } from "../../common/utils";

function TransactionSummary() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [rangePreset, setRangePreset] = useState<string>("30");
  const { statistics } = useTransactionStatistics(startDate, endDate);

  const handleDateRangeChange = (
    startDate: Moment | null,
    endDate: Moment | null
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setRangePreset("_custom");
  };

  const syncDatePickerWithPreset = () => {
    if (rangePreset === "_custom") {
      return;
    }

    const today = moment();
    const lastXDays = moment().subtract(Number(rangePreset), "day");

    setStartDate(lastXDays);
    setEndDate(today);
  };

  useEffect(() => {
    syncDatePickerWithPreset();
  }, [rangePreset]);

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
        <FormControl>
          <InputLabel id="demo-simple-select-label">Range Presets</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rangePreset.toString()}
            label="Range Presets"
            onChange={(e: SelectChangeEvent) => setRangePreset(e.target.value)}
          >
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="60">Last 60 days</MenuItem>
            <MenuItem value="_custom">Custom</MenuItem>
          </Select>
        </FormControl>
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
              {formatMoneyAmount(statistics?.withdraw.sum)}
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
              {formatMoneyAmount(statistics?.deposit.sum)}
            </Typography>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default TransactionSummary;
