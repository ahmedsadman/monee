import { Card, CardContent, Typography } from "@mui/material";
import BarSeriesPlot from "../../../common/components/BarSeriesPlot";

function GroupedTransactionCharts({ data }: Props) {
  const barProps = [
    { dataKey: "deposit", color: "#82ca9d" },
    { dataKey: "withdraw", color: "#8884d8" },
  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, pb: 3 }}
          color="text.secondary"
          gutterBottom
        >
          Withdraw/Deposit by month
        </Typography>
        <BarSeriesPlot data={data} barProps={barProps} xAxisKey="date" />
      </CardContent>
    </Card>
  );
}

type Props = {
  data: object[]; // TODO: Fix this hack of using object[]
};

export default GroupedTransactionCharts;
