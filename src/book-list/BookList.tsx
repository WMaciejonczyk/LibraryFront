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
  isbn: number,
  title: string,
  author: string,
  publisher: string,
  publishYear: number,
  availableCopies: number,
) {
  return { id, isbn, title, author, publisher, publishYear, availableCopies };
}

const rows = [
  createData(
    1,
    9788382656824,
    'Harry Potter i Kamień Filozoficzny',
    'J. K. Rowling',
    'Media Rodzina',
    2000,
    45,
  ),
  createData(2, 9788383610672, 'Bastion', 'S. King', 'Albatros', 1990, 66),
  createData(
    3,
    9788381881548,
    'Problem trzech ciał',
    'C. Liu',
    'Rebis',
    2014,
    30,
  ),
  createData(
    4,
    9788383611433,
    'Teoria Bobra',
    'A. Tuomainen',
    'Albatros',
    2024,
    10,
  ),
];

export default function BookList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">ISBN</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Publisher</TableCell>
            <TableCell align="right">Publish Year</TableCell>
            <TableCell align="right">Available Copies</TableCell>
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
              <TableCell align="right">{row.isbn}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.author}</TableCell>
              <TableCell align="right">{row.publisher}</TableCell>
              <TableCell align="right">{row.publishYear}</TableCell>
              <TableCell align="right">{row.availableCopies}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
