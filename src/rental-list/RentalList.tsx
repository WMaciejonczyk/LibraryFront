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
import { RentalDto } from '../api/dto/rental.dto';
import { useTranslation } from 'react-i18next';

export default function RentalList() {
  const apiClient = useApi();
  const { t } = useTranslation();

  const [rentals, setRentals] = useState<RentalDto[]>([]);

  const formatDate = (milliseconds: number) => {
    const date = new Date(milliseconds);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    apiClient.getAllRentals().then((response) => {
      setRentals(response.data);
    });
  }, [apiClient]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="rent table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">{t('rentDate')}</TableCell>
            <TableCell align="right">{t('dueDate')}</TableCell>
            <TableCell align="right">{t('returnDate')}</TableCell>
            <TableCell align="right">{t('bookId')}</TableCell>
            <TableCell align="right">{t('userId')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentals?.map((rental) => (
            <TableRow
              key={rental.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {rental.id}
              </TableCell>
              <TableCell align="right">{formatDate(rental.rentDate)}</TableCell>
              <TableCell align="right">{formatDate(rental.dueDate)}</TableCell>
              <TableCell align="right">
                {formatDate(rental.returnDate)}
              </TableCell>
              <TableCell align="right">{rental.bookId}</TableCell>
              <TableCell align="right">{rental.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
