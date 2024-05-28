import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  id: number,
  rentDate: string,
  dueDate: string,
  returnDate: string,
  bookId: number,
  userId: number,
) {
  return { id, rentDate, dueDate, returnDate, bookId, userId };
}

const rows = [
  createData(1, '2024-05-04', '2024-06-04', '-', 1, 1),
  createData(2, '2024-02-11', '2024-03-26', '2024-03-24', 1, 2),
  createData(3, '2024-01-22', '2024-02-22', '2024-02-22', 2, 1),
  createData(4, '2023-12-19', '2024-01-19', '2024-01-04', 3, 3),
];

export default function RentalList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="rent table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Rental Date</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Return Date</TableCell>
            <TableCell align="right">Book ID</TableCell>
            <TableCell align="right">User ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.rentDate}</TableCell>
              <TableCell align="right">{row.dueDate}</TableCell>
              <TableCell align="right">{row.returnDate}</TableCell>
              <TableCell align="right">{row.bookId}</TableCell>
              <TableCell align="right">{row.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
