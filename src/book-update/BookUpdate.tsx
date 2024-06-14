import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookUpdate.css';

export default function BookUpdate() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (
      values: {
        id: number;
        isbn: number;
        title: string;
        publisher: string;
        availableCopies: number;
      },
      formik: any,
    ) => {
      console.log(values);
      apiClient.updateBook(values).then((response) => {
        if (response.success) {
          navigate('/homepage');
        } else {
          formik.setFieldError('parameter', t('invalidParams'));
        }
      });
    },
    [t, apiClient, navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        id: yup
          .number()
          .integer()
          .moreThan(0, t('idError'))
          .required(t('idError')),
        isbn: yup.number().integer().moreThan(-1, t('isbnError')),
        availableCopies: yup
          .number()
          .integer()
          .min(0, t('availableCopiesIntError')),
      }),
    [t],
  );
  return (
    <Formik
      initialValues={{
        id: -1,
        isbn: 0,
        title: '',
        publisher: '',
        availableCopies: 0,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="Book-update"
          id="bookUpdate"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            id="id"
            label="ID"
            variant="standard"
            name="id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.id && !!formik.errors.id}
            helperText={formik.touched.id && formik.errors.id}
          />
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
            startIcon={<UpdateIcon />}
            type="submit"
            form="bookUpdate"
            disabled={!(formik.isValid || formik.dirty)}
          >
            {t('update')}
          </Button>
        </form>
      )}
    </Formik>
  );
}
