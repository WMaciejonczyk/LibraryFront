import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import * as React from 'react';
import { ReviewDto } from '../api/dto/review.dto';

export default function ReviewList() {
  const apiClient = useApi();
  const { t } = useTranslation();

  const [reviews, setReviews] = useState<ReviewDto[]>([]);

  const formatDate = (milliseconds: number) => {
    const date = new Date(milliseconds);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    apiClient.getAllReviews().then((response) => {
      console.log(response.data);
      setReviews(response.data);
    });
  }, [apiClient]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="review table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">{t('rating')}</TableCell>
            <TableCell align="right">{t('comment')}</TableCell>
            <TableCell align="right">{t('reviewDate')}</TableCell>
            <TableCell align="right">{t('bookId')}</TableCell>
            <TableCell align="right">{t('userId')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews?.map((review) => (
            <TableRow
              key={review.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {review.id}
              </TableCell>
              <TableCell align="right">{review.rating?.toString()}</TableCell>
              <TableCell align="right">{review.comment}</TableCell>
              <TableCell align="right">
                {formatDate(review.reviewDate)}
              </TableCell>
              <TableCell align="right">{review.bookId}</TableCell>
              <TableCell align="right">{review.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
