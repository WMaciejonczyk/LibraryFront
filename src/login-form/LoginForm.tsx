import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Box, Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Gb, Pl } from 'react-flags-select';

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (values: { login: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate('/homepage');
        } else {
          formik.setFieldError('login', t('invalidLogin'));
        }
      });
    },
    [t, apiClient, navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        login: yup.string().required('Username is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(5, 'Password is too short'),
      }),
    [],
  );
  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <div className="Login-language">
          <form
            className="Login-form"
            id="signForm"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <TextField
              id="login"
              label={t('username')}
              variant="standard"
              name="login"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.login && !!formik.errors.login}
              helperText={formik.touched.login && formik.errors.login}
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
            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              type="submit"
              form="signForm"
              disabled={!(formik.isValid && formik.dirty)}
            >
              {t('signIn')}
            </Button>
          </form>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => i18n.changeLanguage('en')}
          >
            English{' '}
            <Box sx={{ ml: 1 }}>
              <Gb />
            </Box>
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => i18n.changeLanguage('pl')}
          >
            Polski{' '}
            <Box sx={{ ml: 1 }}>
              <Pl />
            </Box>
          </Button>
        </div>
      )}
    </Formik>
  );
}

export default LoginForm;
