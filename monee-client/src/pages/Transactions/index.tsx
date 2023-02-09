import { useCallback, useEffect, useState } from "react";
import { Moment } from "moment";
import { Box, Card, CardContent, Typography } from "@mui/material";
import DateRangePicker from "../../common/components/DateRangePicker";
import useTransactions from "../../data-hooks/useTransactions";
import Table from "../../common/components/Table";

const columns = [
  { id: "description", label: "Description" },
  { id: "amount", label: "Amount" },
  { id: "type", label: "Type" },
  { id: "date", label: "Date" },
];

function Transactions() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const { transactions } = useTransactions(startDate, endDate, 0, 100);

  const handleDateRangeChange = useCallback(
    (startDate: Moment | null, endDate: Moment | null) => {
      setStartDate(startDate);
      setEndDate(endDate);
    },
    []
  );

  useEffect(() => {
    console.log("transactions are", transactions);
  }, [transactions]);

  return (
    <Card>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, pb: 3 }}
          color="text.secondary"
          gutterBottom
        >
          Transactions
        </Typography>
        <DateRangePicker onChange={handleDateRangeChange} />
        <Table columns={columns} rows={transactions} />
      </CardContent>
    </Card>
  );
}

export default Transactions;
