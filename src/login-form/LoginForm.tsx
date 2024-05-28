import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      navigate('/home');
    },
    [navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(5, 'Password is too short'),
      }),
    [],
  );
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="Login-form"
          id="signForm"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            id="username"
            label="Username"
            variant="standard"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            label="Password"
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
            Sign in
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
