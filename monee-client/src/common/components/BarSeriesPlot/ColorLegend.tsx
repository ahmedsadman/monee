import { Box } from "@mui/material";
import { PlotData } from "../../types";

function ColorLegend({ items }: ColorLegendProps) {
  return (
    <Box
      sx={{
        ml: 3.5,
        fontSize: "0.8em",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        width: 200,
        justifyContent: "space-around",
      }}
    >
      {items.map((item) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
          }}
          key={item.title}
        >
          <Box
            sx={{
              backgroundColor: item.color,
              width: 10,
              height: 10,
              mr: 1,
            }}
          ></Box>
          <span>{item.title}</span>
        </Box>
      ))}
    </Box>
  );
}

type SeriesMeta = {
  title: string;
  color: string;
  data: PlotData[];
};

type ColorLegendProps = {
  items: SeriesMeta[];
};

export default ColorLegend;
