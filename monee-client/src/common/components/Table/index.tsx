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

function Table({
  columns,
  rows,
  count,
  identityKey,
  onPageChange,
  lazyLoad = false,
  height = 450,
  pageSize = 25,
}: TableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const handlePageChange = useCallback(
    (e: unknown, newPage: number) => {
      setPage(newPage);
      onPageChange?.(newPage);
    },
    [onPageChange]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
      onPageChange?.(0);
    },
    [onPageChange]
  );

  const resetPage = useCallback(() => {
    setPage(0);
  }, []);

  useEffect(() => {
    if (!lazyLoad) {
      resetPage();
    }
  }, [lazyLoad, resetPage]);

  const _rows = lazyLoad
    ? rows
    : rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer sx={{ height }}>
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
            {_rows.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row[identityKey]}
                >
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
        count={count ? count : rows.length}
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
  identityKey: string;
  lazyLoad?: boolean;
  height?: number | null;
  count?: number;
  pageSize?: number;
  onPageChange?: (pageNo: number) => void;
};

export default Table;
