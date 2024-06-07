import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import './ReviewAdd.css';

export default function ReviewAdd() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (
      values: { rating: string; comment: string; bookId: number },
      formik: any,
    ) => {
      apiClient.addReview(values).then((response) => {
        if (response.success) {
          navigate('/homepage');
        } else {
          formik.setFieldError('bookId', t('invalidParams'));
        }
      });
    },
    [t, apiClient, navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        rating: yup.string().required(t('ratingError')),
        comment: yup.string().required(t('commentError')),
        bookId: yup
          .number()
          .integer()
          .min(1, t('bookIdError'))
          .required(t('bookIdError')),
      }),
    [t],
  );
  return (
    <Formik
      initialValues={{
        rating: '',
        comment: '',
        bookId: 0,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="Review-add"
          id="reviewAdd"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            id="rating"
            label={t('rating')}
            variant="standard"
            name="rating"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rating && !!formik.errors.rating}
            helperText={formik.touched.rating && formik.errors.rating}
          />
          <TextField
            id="comment"
            label={t('comment')}
            variant="standard"
            name="comment"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.comment && !!formik.errors.comment}
            helperText={formik.touched.comment && formik.errors.comment}
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            type="submit"
            form="reviewAdd"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('add')}
          </Button>
        </form>
      )}
    </Formik>
  );
}
