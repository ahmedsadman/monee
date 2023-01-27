import { Box, Card, CardContent, Typography } from "@mui/material";
import { formatMoneyAmount } from "../../../common/utils";
import { Statistics } from "../../../common/types";

function TransactionSummary({ statistics }: TransactionSummaryProps) {
  return (
    <Card>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, pb: 3 }}
          color="text.secondary"
          gutterBottom
        >
          Transaction Summary
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Card sx={{ mt: 1, flex: 1 }} variant="outlined">
            <CardContent>
              <Typography
                sx={{ fontSize: 14, pb: 1, mr: 2 }}
                color="text.secondary"
                gutterBottom
              >
                Withdraw
              </Typography>
              <Typography variant="h5" component="div">
                {formatMoneyAmount(statistics?.withdraw.sum)}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ mt: 1, flex: 1, ml: 2 }} variant="outlined">
            <CardContent>
              <Typography
                sx={{ fontSize: 14, pb: 1 }}
                color="text.secondary"
                gutterBottom
              >
                Deposit
              </Typography>
              <Typography variant="h5" component="div">
                {formatMoneyAmount(statistics?.deposit.sum)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </CardContent>
    </Card>
  );
}

type TransactionSummaryProps = {
  statistics: Statistics | undefined;
};

export default TransactionSummary;
