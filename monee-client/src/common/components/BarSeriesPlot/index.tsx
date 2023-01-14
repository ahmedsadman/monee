import { Box } from "@mui/material";

import {
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  FlexibleWidthXYPlot,
} from "react-vis";
import { PlotData } from "../../types";
import ColorLegend from "./ColorLegendl";

function BarSeriesPlot({ series }: BarSeriesPlotProps) {
  return (
    <>
      <ColorLegend items={series} />
      <FlexibleWidthXYPlot
        xType="ordinal"
        height={300}
        margin={{ left: 100, right: 100 }}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        {series.map((plot) => (
          <VerticalBarSeries
            barWidth={0.8}
            color={plot.color}
            data={plot.data}
            key={plot.title}
          />
        ))}
      </FlexibleWidthXYPlot>
    </>
  );
}

type Plot = {
  title: string;
  data: PlotData[];
  color: string;
};

type BarSeriesPlotProps = {
  series: Plot[];
};

export default BarSeriesPlot;
