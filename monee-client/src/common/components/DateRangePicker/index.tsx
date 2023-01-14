import { useEffect, useState, useCallback } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Select,
} from "@mui/material";

function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [rangePreset, setRangePreset] = useState<string>("30");

  const handleDateRangeChange = useCallback(
    (startDate: Moment | null, endDate: Moment | null, isCustom?: boolean) => {
      setStartDate(startDate);
      setEndDate(endDate);

      if (isCustom) {
        setRangePreset("_custom");
      }

      onChange(startDate, endDate);
    },
    [onChange]
  );

  const syncDatePickerWithPreset = useCallback(() => {
    if (rangePreset === "_custom") {
      return;
    }

    const today = moment();
    const lastXDays = moment().subtract(Number(rangePreset), "day");
    handleDateRangeChange(lastXDays, today);
  }, [handleDateRangeChange, rangePreset]);

  useEffect(() => {
    syncDatePickerWithPreset();
  }, [syncDatePickerWithPreset]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        label="From"
        inputFormat="DD/MM/YYYY"
        value={startDate}
        onChange={(newFromDate) =>
          handleDateRangeChange(newFromDate, endDate, true)
        }
        renderInput={(params) => <TextField {...params} />}
      />
      <DesktopDatePicker
        label="To"
        inputFormat="DD/MM/YYYY"
        value={endDate}
        onChange={(newToDate) =>
          handleDateRangeChange(startDate, newToDate, true)
        }
        renderInput={(params) => <TextField {...params} />}
      />
      <FormControl>
        <InputLabel>Range Presets</InputLabel>
        <Select
          value={rangePreset.toString()}
          label="Range Presets"
          onChange={(e: SelectChangeEvent) => setRangePreset(e.target.value)}
        >
          <MenuItem value="30">Last month</MenuItem>
          <MenuItem value="90">Last 3 months</MenuItem>
          <MenuItem value="180">Last 6 months</MenuItem>
          <MenuItem value="365">Last year</MenuItem>
          <MenuItem value="_custom">Custom</MenuItem>
        </Select>
      </FormControl>
    </LocalizationProvider>
  );
}

type DateRangePickerProps = {
  onChange: (start: Moment | null, end: Moment | null) => void;
};

export default DateRangePicker;
