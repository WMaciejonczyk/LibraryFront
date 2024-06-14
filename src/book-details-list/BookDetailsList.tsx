import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { BookDetailsDto } from '../api/dto/book.dto';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as React from 'react';

export default function BookDetailsList() {
  const apiClient = useApi();
  const { t } = useTranslation();

  const [bookDetails, setBookDetails] = useState<BookDetailsDto[]>([]);

  useEffect(() => {
    apiClient.getAllBookDetails().then((response) => {
      setBookDetails(response.data);
    });
  }, [apiClient]);

  return (
    <div className="Book-details-list">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="book details table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">{t('genre')}</TableCell>
              <TableCell align="right">{t('description')}</TableCell>
              <TableCell align="right">{t('coverImageURL')}</TableCell>
              <TableCell align="right">{t('bookId')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookDetails?.map((bookDetail) => (
              <TableRow
                key={bookDetail.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {bookDetail.id}
                </TableCell>
                <TableCell align="right">{bookDetail.genre}</TableCell>
                <TableCell align="right">{bookDetail.description}</TableCell>
                <TableCell align="right">{bookDetail.coverImageURL}</TableCell>
                <TableCell align="right">{bookDetail.bookId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
