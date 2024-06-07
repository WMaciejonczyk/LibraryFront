import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import './RentalEnd.css';

export default function RentalEnd() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (
      values: {
        id: number;
      },
      formik: any,
    ) => {
      apiClient.endRental(values).then((response) => {
        if (response.success) {
          navigate('/homepage');
        } else {
          formik.setFieldError('id', t('invalidParams'));
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
      }),
    [t],
  );
  return (
    <Formik
      initialValues={{
        id: 0,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="Rental-end"
          id="rentalEnd"
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
          <Button
            variant="contained"
            startIcon={<CloseIcon />}
            type="submit"
            form="rentalEnd"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('end')}
          </Button>
        </form>
      )}
    </Formik>
  );
}
