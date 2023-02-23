import { useCallback, useState } from "react";
import { Moment } from "moment";
import { Card, CardContent, Typography } from "@mui/material";
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

  const { transactions, count } = useTransactions(
    startDate,
    endDate,
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
