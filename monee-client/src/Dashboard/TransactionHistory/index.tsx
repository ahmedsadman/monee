import { Card, CardContent } from "@mui/material";
import useTransactionHistory from "../../data-hooks/useTransactionHistory";
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  LabelSeries,
  LabelSeriesPoint,
} from "react-vis";

const greenData = [
  { x: "A", y: 10 },
  { x: "B", y: 5 },
  { x: "C", y: 15 },
];

const blueData = [
  { x: "A", y: 12 },
  { x: "B", y: 2 },
  { x: "C", y: 11 },
];

const labelData = greenData.map((d, idx) => ({
  x: d.x,
  y: Math.max(greenData[idx].y, blueData[idx].y),
}));

function TransactionHistory() {
  const transactionHistory = useTransactionHistory();
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={greenData} barWidth={0.8} />
          <VerticalBarSeries barWidth={0.8} data={blueData} />
        </XYPlot>
      </CardContent>
    </Card>
  );
}

export default TransactionHistory;
