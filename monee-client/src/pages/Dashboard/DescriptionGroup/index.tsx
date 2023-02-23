import { useCallback } from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { GroupedTransactionDescription } from "../../../common/types";
import Table from "../../../common/components/Table";

const columns = [
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "amount", label: "Amount" },
];

function DescriptionGroup({ withdrawls, deposits, resultLimit }: Props) {
  const mapToTable = useCallback(
    (data: GroupedTransactionDescription[]) =>
      data.map((item) => {
        const { description, type, sum } = item;
        return { name: description, type, amount: sum };
      }),
    []
  );

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, pb: 3 }}
          color="text.secondary"
          gutterBottom
        >
          {`Transaction by name (Top ${resultLimit})`}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ mr: 3, flex: 1 }}>
            <Typography sx={{ fontSize: 18, pb: 1 }} color="text.primary">
              Deposits
            </Typography>
            <Table
              columns={columns}
              rows={mapToTable(deposits || [])}
              identityKey="name"
            />
          </Box>

          <Box sx={{ ml: 3, flex: 1 }}>
            <Typography sx={{ fontSize: 18, pb: 1 }} color="text.primary">
              Withdrawls
            </Typography>
            <Table
              columns={columns}
              rows={mapToTable(withdrawls || [])}
              identityKey="name" // TODO: Description is not unique sometimes
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

type Props = {
  withdrawls: GroupedTransactionDescription[];
  deposits: GroupedTransactionDescription[];
  resultLimit: number | string;
};

export default DescriptionGroup;
