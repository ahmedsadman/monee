import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BarSeriesPlot({ data, barProps, xAxisKey }: BarSeriesPlotProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={1200}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {barProps.map((bar) => (
          <Bar dataKey={bar.dataKey} key={bar.dataKey} fill={bar.color} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

type BarProp = {
  dataKey: string;
  color: string;
};

type BarSeriesPlotProps = {
  data: object[]; // TODO: Fix this hacky way of using object[], make it specific
  barProps: BarProp[];
  xAxisKey: string;
};

export default BarSeriesPlot;
