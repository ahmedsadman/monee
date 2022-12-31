import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Moment } from "moment";

// TODO: Should move to a common component directory
function DateRangePicker(props: DateRangePickerProps) {
  const { onChange, startValue, endValue } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        label="From"
        inputFormat="DD/MM/YYYY"
        value={startValue}
        onChange={(newValue) => onChange(newValue, endValue)}
        renderInput={(params) => <TextField {...params} />}
      />
      <DesktopDatePicker
        label="To"
        inputFormat="DD/MM/YYYY"
        value={endValue}
        onChange={(newValue) => onChange(startValue, newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

type DateRangePickerProps = {
  onChange: (start: Moment | null, end: Moment | null) => void;
  startValue: Moment | null;
  endValue: Moment | null;
};

export default DateRangePicker;
