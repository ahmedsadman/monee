import { useState, useCallback } from "react";
import { AppBar, Paper, Button, Box } from "@mui/material";
import { Moment } from "moment";

import TransactionSummary from "./TransactionSummary";
import GroupedTransactionCharts from "./GroupedTransactionCharts";
import DescriptionGroup from "./DescriptionGroup";
import DateRangePicker from "../../common/components/DateRangePicker";
import UploadStatementModal from "./UploadStatementModal";

import useTransactionStatistics from "../../data-hooks/useTransactionStatistics";
import useTransactionGroupByMonth from "../../data-hooks/useTransactionGroupByMonth";
import useTransactionGroupByDescription from "../../data-hooks/useTransactionGroupByDescription";

const DESCRIPION_GROUP_LIMIT = 100;

function Dashboard() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [showUploadStmtModal, setShowUploadStmtModal] = useState(false);

  const { statistics } = useTransactionStatistics(startDate, endDate);
  const { groupedByMonth } = useTransactionGroupByMonth(startDate, endDate);
  const descriptionGroup = useTransactionGroupByDescription(
    startDate,
    endDate,
    "",
    0,
    DESCRIPION_GROUP_LIMIT
  );

  const handleDateRangeChange = useCallback(
    (startDate: Moment | null, endDate: Moment | null) => {
      setStartDate(startDate);
      setEndDate(endDate);
    },
    []
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ mb: 3, backgroundColor: "white", color: "black" }}
      >
        <Paper variant="outlined" sx={{ padding: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <DateRangePicker onChange={handleDateRangeChange} />
            <Button
              variant="contained"
              onClick={() => setShowUploadStmtModal(true)}
              sx={{ ml: 1 }}
            >
              Upload Statement
            </Button>
          </Box>
        </Paper>
      </AppBar>
      <TransactionSummary statistics={statistics} />
      <GroupedTransactionCharts data={groupedByMonth || []} />
      <DescriptionGroup
        withdrawls={descriptionGroup.withdrawls || []}
        deposits={descriptionGroup.deposits || []}
        resultLimit={DESCRIPION_GROUP_LIMIT}
      />
      {showUploadStmtModal && (
        <UploadStatementModal
          show
          onClose={() => setShowUploadStmtModal(false)}
        />
      )}
    </>
  );
}

export default Dashboard;
