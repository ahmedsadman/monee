import TransactionSummary from "./TransactionSummary";
import GroupedTransactionCharts from "./GroupedTransactionCharts";
import DescriptionGroup from "./DescriptionGroup";

function Dashboard() {
  return (
    <>
      <TransactionSummary />
      <GroupedTransactionCharts />
      <DescriptionGroup />
    </>
  );
}

export default Dashboard;
