import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useApi } from '../api/ApiProvider';
import { useEffect, useState } from 'react';
import { BookDto } from '../api/dto/book.dto';
import { useTranslation } from 'react-i18next';

export default function BookList() {
  const apiClient = useApi();
  const { t } = useTranslation();

  const [books, setBooks] = useState<BookDto[]>([]);

  useEffect(() => {
    apiClient.getAllBooks().then((response) => {
      setBooks(response.data);
    });
  }, [apiClient]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="book table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">ISBN</TableCell>
            <TableCell align="right">{t('title')}</TableCell>
            <TableCell align="right">{t('author')}</TableCell>
            <TableCell align="right">{t('publisher')}</TableCell>
            <TableCell align="right">{t('publishYear')}</TableCell>
            <TableCell align="right">{t('availableCopies')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books?.map((book) => (
            <TableRow
              key={book.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {book.id}
              </TableCell>
              <TableCell align="right">{book.isbn}</TableCell>
              <TableCell align="right">{book.title}</TableCell>
              <TableCell align="right">{book.author}</TableCell>
              <TableCell align="right">{book.publisher}</TableCell>
              <TableCell align="right">{book.publishYear}</TableCell>
              <TableCell align="right">{book.availableCopies}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
