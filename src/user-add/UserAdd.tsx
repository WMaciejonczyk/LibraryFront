import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import './UserAdd.css';
import { useTranslation } from 'react-i18next';

export default function UserAdd() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (
      values: {
        username: string;
        password: string;
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
      apiClient.addUser(transformedValues).then((response) => {
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
        username: yup.string().required(t('usernameError')),
        password: yup.string().required(t('passwordError')),
        role: yup.string().required(t('roleError')),
        email: yup.string().required(t('emailError')),
        fullName: yup.string().required(t('fullNameError')),
      }),
    [t],
  );
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
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
          className="User-add"
          id="userAdd"
          onSubmit={formik.handleSubmit}
          noValidate
        >
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
            id="password"
            label={t('password')}
            variant="standard"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
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
            startIcon={<AddIcon />}
            type="submit"
            form="userAdd"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('add')}
          </Button>
        </form>
      )}
    </Formik>
  );
}
