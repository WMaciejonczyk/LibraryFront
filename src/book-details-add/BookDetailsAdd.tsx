import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import './BookDetailsAdd.css';

export default function BookDetailsAdd() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (
      values: {
        bookId: number;
        genre: string;
        description: string;
        coverImageURL: string;
      },
      formik: any,
    ) => {
      apiClient.addBookDetails(values).then((response) => {
        if (response.success) {
          navigate('/homepage');
        } else {
          formik.setFieldError('coverImageURL', t('invalidParams'));
        }
      });
    },
    [t, apiClient, navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        bookId: yup
          .number()
          .integer()
          .moreThan(0, t('bookIdError'))
          .required(t('bookIdError')),
        genre: yup.string().required(t('genreError')),
        description: yup.string().required(t('descriptionError')),
        coverImageURL: yup.string().required(t('coverImageURLError')),
      }),
    [t],
  );
  return (
    <Formik
      initialValues={{
        bookId: 0,
        genre: '',
        description: '',
        coverImageURL: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="Book-details-add"
          id="bookDetailsAdd"
          onSubmit={formik.handleSubmit}
          noValidate
        >
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
            id="genre"
            label={t('genre')}
            variant="standard"
            name="genre"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.genre && !!formik.errors.genre}
            helperText={formik.touched.genre && formik.errors.genre}
          />
          <TextField
            id="description"
            label={t('description')}
            variant="standard"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            id="coverImageURL"
            label={t('coverImageURL')}
            variant="standard"
            name="coverImageURL"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.coverImageURL && !!formik.errors.coverImageURL
            }
            helperText={
              formik.touched.coverImageURL && formik.errors.coverImageURL
            }
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            type="submit"
            form="bookDetailsAdd"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('add')}
          </Button>
        </form>
      )}
    </Formik>
  );
}
