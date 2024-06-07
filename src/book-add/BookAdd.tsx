import { useApi } from '../api/ApiProvider';
import { useCallback, useMemo } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './BookAdd.css';
import { useTranslation } from 'react-i18next';

export default function BookAdd() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (
      values: {
        isbn: number;
        title: string;
        author: string;
        publisher: string;
        publishYear: number;
        availableCopies: number;
      },
      formik: any,
    ) => {
      apiClient.addBook(values).then((response) => {
        if (response.success) {
          navigate('/homepage');
        } else {
          formik.setFieldError('availableCopies', t('invalidParams'));
        }
      });
    },
    [t, apiClient, navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        isbn: yup
          .number()
          .integer()
          .moreThan(0, t('isbnError'))
          .required(t('isbnError')),
        title: yup.string().required(t('titleError')),
        author: yup.string().required(t('authorError')),
        publisher: yup.string().required(t('publisherError')),
        publishYear: yup
          .number()
          .integer()
          .min(1970, t('publishYearIntError'))
          .max(new Date().getFullYear())
          .required(t('publishYearError')),
        availableCopies: yup
          .number()
          .integer()
          .min(1, t('availableCopiesIntError'))
          .required('availableCopiesError'),
      }),
    [t],
  );
  return (
    <Formik
      initialValues={{
        isbn: 0,
        title: '',
        author: '',
        publisher: '',
        publishYear: 0,
        availableCopies: 0,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="Book-add"
          id="bookAdd"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            id="isbn"
            label="ISBN"
            variant="standard"
            name="isbn"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.isbn && !!formik.errors.isbn}
            helperText={formik.touched.isbn && formik.errors.isbn}
          />
          <TextField
            id="title"
            label={t('title')}
            variant="standard"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            id="author"
            label={t('author')}
            variant="standard"
            name="author"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.author && !!formik.errors.author}
            helperText={formik.touched.author && formik.errors.author}
          />
          <TextField
            id="publisher"
            label={t('publisher')}
            variant="standard"
            name="publisher"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.publisher && !!formik.errors.publisher}
            helperText={formik.touched.publisher && formik.errors.publisher}
          />
          <TextField
            id="publishYear"
            label={t('publishYear')}
            variant="standard"
            name="publishYear"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.publishYear && !!formik.errors.publishYear}
            helperText={formik.touched.publishYear && formik.errors.publishYear}
          />
          <TextField
            id="availableCopies"
            label={t('availableCopies')}
            variant="standard"
            name="availableCopies"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.availableCopies && !!formik.errors.availableCopies
            }
            helperText={
              formik.touched.availableCopies && formik.errors.availableCopies
            }
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            type="submit"
            form="bookAdd"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('add')}
          </Button>
        </form>
      )}
    </Formik>
  );
}
