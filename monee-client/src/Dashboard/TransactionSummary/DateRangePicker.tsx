import { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Moment } from "moment";

// TODO: Should move to a common component directory
function DateRangePicker() {
  const [startValue, setStartValue] = useState<Moment | null>(null);
  const [endValue, setEndValue] = useState<Moment | null>(null);

  return (
    <LocalizationProvider
      dateAdapter={AdapterMoment}
      localeText={{ start: "Check-in", end: "Check-out" }}
    >
      <DesktopDatePicker
        label="From"
        inputFormat="MM/DD/YYYY"
        value={startValue}
        onChange={(newValue) => setStartValue(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
      <DesktopDatePicker
        label="To"
        inputFormat="MM/DD/YYYY"
        value={endValue}
        onChange={(newValue) => setEndValue(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default DateRangePicker;
