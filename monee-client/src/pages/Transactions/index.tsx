import { useCallback, useState } from "react";
import { Moment } from "moment";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
  TextField,
} from "@mui/material";
import DateRangePicker from "../../common/components/DateRangePicker";
import DescriptionGroup from "../Dashboard/DescriptionGroup";
import useTransactions from "../../data-hooks/useTransactions";
import useTransactionGroupByDescription from "../../data-hooks/useTransactionGroupByDescription";
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
  const [tab, setTab] = useState<Number>(0);

  const { transactions, count } = useTransactions(
    startDate,
    endDate,
    query,
    offset,
    RESULT_LIMIT
  );

  const descriptionGroup = useTransactionGroupByDescription(
    startDate,
    endDate,
    0,
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

  const handleTabChange = useCallback((tabNo: Number) => {
    setTab(tabNo);
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
        <Tabs
          sx={{ mt: 3, mb: 1 }}
          value={tab}
          onChange={(e, tabNo) => handleTabChange(tabNo)}
        >
          <Tab label="All" />
          <Tab label="By Description" />
        </Tabs>

        {tab === 0 && (
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
        )}

        {tab === 1 && (
          <DescriptionGroup
            withdrawls={descriptionGroup.withdrawls || []}
            deposits={descriptionGroup.deposits || []}
            resultLimit={RESULT_LIMIT}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default Transactions;
