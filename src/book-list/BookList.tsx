import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useApi } from '../api/ApiProvider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookDto } from '../api/dto/book.dto';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Formik } from 'formik';
import { DropdownButton } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './BookList.css';

export default function BookList() {
  const apiClient = useApi();
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');
  const [dropDownTitle, setDropdownTitle] = useState<string>(
    t('selectParameter'),
  );
  const [books, setBooks] = useState<BookDto[]>([]);
  const [initialBooks, setInitialBooks] = useState<BookDto[]>([]);

  useEffect(() => {
    apiClient.getAllBooks().then((response) => {
      setBooks(response.data);
      setInitialBooks(response.data);
    });
  }, [apiClient]);

  useEffect(() => {
    setDropdownTitle(t('selectParameter'));
  }, [t]);

  const handleSelect = (evtKey: any) => {
    setValue(evtKey);
    setDropdownTitle(t(evtKey));
  };
  const onSubmit = useCallback(
    (
      values: {
        parameter: string;
      },
      formik: any,
    ) => {
      if (value === 'author') {
        apiClient.getByAuthor(values.parameter).then((response) => {
          if (response.success) {
            setBooks(response.data);
          } else {
            formik.setFieldError('parameter', t('invalidParams'));
          }
        });
      }
      if (value === 'title') {
        apiClient.getByTitle(values.parameter).then((response) => {
          if (response.success) {
            setBooks(response.data);
          } else {
            formik.setFieldError('parameter', t('invalidParams'));
          }
        });
      }
      if (value === 'isbn') {
        apiClient.getByIsbn(values.parameter).then((response) => {
          if (response.success) {
            setBooks(response.data);
          } else {
            formik.setFieldError('parameter', t('invalidParams'));
          }
        });
      }
    },
    [value, t, apiClient],
  );

  const handleClear = () => {
    setBooks(initialBooks);
    setDropdownTitle(t('selectParameter'));
    setValue('');
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        parameter: yup.string().required(t('parameterError')),
      }),
    [t],
  );
  return (
    <Formik
      initialValues={{
        parameter: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <div className="Book-list">
          <form
            className="Book-list-form"
            id="bookSearch"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <DropdownButton
              title={dropDownTitle}
              id="search"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="author">{t('author')}</Dropdown.Item>
              <Dropdown.Item eventKey="title">{t('title')}</Dropdown.Item>
              <Dropdown.Item eventKey="isbn">{t('isbn')}</Dropdown.Item>
            </DropdownButton>
            <TextField
              id="parameter"
              label={t('parameter')}
              variant="standard"
              name="parameter"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.parameter && !!formik.errors.parameter}
              helperText={formik.touched.parameter && formik.errors.parameter}
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              type="submit"
              form="bookSearch"
              disabled={
                !(
                  formik.isValid &&
                  formik.dirty &&
                  dropDownTitle !== t('selectParameter')
                )
              }
            >
              {t('search')}
            </Button>
            <Button
              variant="contained"
              startIcon={<CloseIcon />}
              type="button"
              onClick={() => handleClear()}
              disabled={books === initialBooks}
            >
              {t('clear')}
            </Button>
          </form>
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
        </div>
      )}
    </Formik>
  );
}
