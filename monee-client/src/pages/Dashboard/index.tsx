import { AppBar, Paper } from "@mui/material";
import TransactionSummary from "./TransactionSummary";
import GroupedTransactionCharts from "./GroupedTransactionCharts";
import DescriptionGroup from "./DescriptionGroup";
import DateRangePicker from "../../common/components/DateRangePicker";

function Dashboard() {
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ mb: 3, backgroundColor: "white", color: "black" }}
      >
        <Paper variant="outlined" sx={{ padding: 3 }}>
          <DateRangePicker onChange={() => {}} />
        </Paper>
      </AppBar>
      <TransactionSummary />
      <GroupedTransactionCharts />
      <DescriptionGroup />
    </>
  );
}

export default Dashboard;
