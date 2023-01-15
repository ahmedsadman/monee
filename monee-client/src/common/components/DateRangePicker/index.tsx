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

export const defaultPresetOptions: PresetOption[] = [
  { label: "Last month", value: "30", default: true },
  { label: "Last 3 months", value: "90" },
  { label: "Last 6 months", value: "180" },
  { label: "Last year", value: "365" },
];

function DateRangePicker({ onChange, presetOptions }: DateRangePickerProps) {
  const _presetOptions = [
    ...(presetOptions || defaultPresetOptions),
    { label: "Custom", value: "_custom" },
  ];

  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [rangePreset, setRangePreset] = useState<string>(
    _presetOptions.find((option) => option.default)!.value
  );

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
        views={["year", "month"]}
      />
      <FormControl>
        <InputLabel>Range Presets</InputLabel>
        <Select
          value={rangePreset.toString()}
          label="Range Presets"
          onChange={(e: SelectChangeEvent) => setRangePreset(e.target.value)}
        >
          {_presetOptions.map((option) => (
            <MenuItem value={option.value} key={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </LocalizationProvider>
  );
}

type DateRangePickerProps = {
  onChange: (start: Moment | null, end: Moment | null) => void;
  presetOptions?: PresetOption[];
};

type PresetOption = {
  label: string;
  value: string;
  default?: boolean;
};

export default DateRangePicker;
