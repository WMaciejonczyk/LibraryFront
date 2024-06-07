import { useApi } from '../api/ApiProvider';
import { useCallback, useMemo } from 'react';
import * as React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import './RentalAdd.css';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function RentalAdd() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (
      values: { bookId: number; userId: number; dueDate: string },
      formik: any,
    ) => {
      apiClient.addRental(values).then((response) => {
        if (response.success) {
          navigate('/homepage');
        } else {
          formik.setFieldError('userId', t('invalidParams'));
        }
      });
    },
    [t, apiClient, navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        dueDate: yup.string().required(t('dueDateError')),
        bookId: yup
          .number()
          .integer()
          .min(1, t('bookIdError'))
          .required(t('bookIdError')),
        userId: yup
          .number()
          .integer()
          .min(1, t('userIdError'))
          .required(t('userIdError')),
      }),
    [t],
  );
  return (
    <Formik
      initialValues={{
        dueDate: '',
        bookId: 0,
        userId: 0,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="Rental-add"
          id="rentalAdd"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            id="dueDate"
            label={t('dueDate')}
            variant="standard"
            name="dueDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dueDate && !!formik.errors.dueDate}
            helperText={formik.touched.dueDate && formik.errors.dueDate}
          />
          <TextField
            id="bookId"
            label={t('bookId')}
            variant="standard"
            name="bookId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bookId && !!formik.errors.bookId}
            helperText={formik.touched.bookId && formik.errors.bookId}
          />
          <TextField
            id="userId"
            label={t('userId')}
            variant="standard"
            name="userId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userId && !!formik.errors.userId}
            helperText={formik.touched.userId && formik.errors.userId}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            type="submit"
            form="rentalAdd"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('add')}
          </Button>
        </form>
      )}
    </Formik>
  );
}
