import { Card, CardContent, Typography } from "@mui/material";
import DateRangePicker from "./DateRangePicker";

function TransactionSummary() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          sx={{ fontSize: 14, pb: 3 }}
          color="text.secondary"
          gutterBottom
        >
          Transaction Summary
        </Typography>
        <DateRangePicker />
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, pb: 3 }}
              color="text.secondary"
              gutterBottom
            >
              Withdraw
            </Typography>
            <Typography variant="h5" component="div">
              1200$
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, pb: 3 }}
              color="text.secondary"
              gutterBottom
            >
              Deposit
            </Typography>
            <Typography variant="h5" component="div">
              2500$
            </Typography>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default TransactionSummary;
