import { useCallback, useState } from "react";
import { Moment } from "moment";
import { Card, CardContent, Typography, TextField } from "@mui/material";
import DateRangePicker from "../../common/components/DateRangePicker";
import useTransactions from "../../data-hooks/useTransactions";
import Table from "../../common/components/Table";

const columns = [
  { id: "description", label: "Description" },
  { id: "amount", label: "Amount" },
  { id: "type", label: "Type" },
  { id: "date", label: "Date" },
];

const RESULT_LIMIT = 25;

function Transactions() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState<string>(""); // TODO: Add debounce to request

  const { transactions, count } = useTransactions(
    startDate,
    endDate,
    query,
    offset,
    RESULT_LIMIT
  );

  const handleDateRangeChange = useCallback(
    (startDate: Moment | null, endDate: Moment | null) => {
      setStartDate(startDate);
      setEndDate(endDate);
    },
    []
  );

  const handlePageChange = useCallback((pageNo: number) => {
    const newOffset = pageNo * RESULT_LIMIT;
    setOffset(newOffset);
  }, []);

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
        <TextField
          sx={{ mr: 3 }}
          variant="outlined"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <DateRangePicker onChange={handleDateRangeChange} />
        <Table
          columns={columns}
          rows={transactions}
          count={count}
          identityKey="id"
          lazyLoad
          height={800}
          pageSize={RESULT_LIMIT}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
}

export default Transactions;
