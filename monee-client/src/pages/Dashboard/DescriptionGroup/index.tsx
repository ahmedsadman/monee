import { useState, useCallback } from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import useTransactionGroupByDescription from "../../../data-hooks/useTransactionGroupByDescription";
import { GroupedTransactionDescription } from "../../../common/types";
import Table from "../../../common/components/Table";
import { Moment } from "moment";
import DateRangePicker from "../../../common/components/DateRangePicker";

const columns = [
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "amount", label: "Amount" },
];

function DescriptionGroup() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const { deposits, withdrawls } = useTransactionGroupByDescription(
    startDate,
    endDate
  );

  const handleDateRangeChange = useCallback(
    (startDate: Moment | null, endDate: Moment | null) => {
      setStartDate(startDate);
      setEndDate(endDate);
    },
    []
  );

  const mapToTable = useCallback(
    (data: GroupedTransactionDescription[]) =>
      data.map((item) => {
        const { description, type, sum } = item;
        return { name: description, type, amount: sum };
      }),
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
          Transaction by name
        </Typography>
        <Box sx={{ mb: 3 }}>
          <DateRangePicker onChange={handleDateRangeChange} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ mr: 3, flex: 1 }}>
            <Typography sx={{ fontSize: 18, pb: 1 }} color="text.primary">
              Deposits
            </Typography>
            <Table columns={columns} rows={mapToTable(deposits || [])} />
          </Box>

          <Box sx={{ ml: 3, flex: 1 }}>
            <Typography sx={{ fontSize: 18, pb: 1 }} color="text.primary">
              Withdrawls
            </Typography>
            <Table columns={columns} rows={mapToTable(withdrawls || [])} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DescriptionGroup;
