import { useCallback, useEffect, useState } from "react";
import {
  Table as MUITable,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TablePagination,
} from "@mui/material";

function Table({ columns, rows }: TableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = useCallback((e: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    },
    []
  );

  const resetPage = useCallback(() => {
    setPage(0);
  }, []);

  useEffect(() => {
    resetPage();
  }, [rows, columns, resetPage]);

  return (
    <>
      <TableContainer sx={{ height: 450 }}>
        <MUITable stickyHeader>
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="left">
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </MUITable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

type Column = {
  id: string;
  label: string;
  minWidth?: number;
};

type Row = {
  [key: string]: string;
};

type TableProps = {
  columns: Column[];
  rows: Row[];
};

export default Table;
