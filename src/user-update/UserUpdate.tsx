import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import * as React from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import './UserUpdate.css';

export default function UserUpdate() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (
      values: {
        id: number;
        username: string;
        role: string;
        email: string;
        fullName: string;
      },
      formik: any,
    ) => {
      const transformedValues = {
        ...values,
        role: 'ROLE_' + values.role.toUpperCase(),
      };
      apiClient.updateUser(transformedValues).then((response) => {
        if (response.success) {
          navigate('/homepage');
        } else {
          formik.setFieldError('fullName', t('invalidParams'));
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
        id: -1,
        username: '',
        role: '',
        email: '',
        fullName: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="User-update"
          id="userUpdate"
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
            id="username"
            label={t('username')}
            variant="standard"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="role"
            label={t('role')}
            variant="standard"
            name="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.role && !!formik.errors.role}
            helperText={formik.touched.role && formik.errors.role}
          />
          <TextField
            id="email"
            label="E-mail"
            variant="standard"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="fullName"
            label={t('fullName')}
            variant="standard"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && !!formik.errors.fullName}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            type="submit"
            form="userUpdate"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('update')}
          </Button>
        </form>
      )}
    </Formik>
  );
}
