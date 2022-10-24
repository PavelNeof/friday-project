import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { useFormik } from 'formik';
import {
    Button,
    FormControl,
    FormGroup,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
} from '@mui/material';
import { PATH } from '../../../common/routing/Route/Route';
import { setRegistrationTC } from '../auth-reducer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './Registration.module.css';
import ErrorSnackbars from '../../../common/components/ErrorSnackbars/ErrorSnackbars';

type FormikRegErrorType = {
    email?: string;
    password?: string;
    confirmPassword?: string;
};

type State = {
    showPassword: boolean;
    showConfirmPassword: boolean;
};

export const Registration = () => {
    //registrationDone - значение авторизации (true/false)
    const registrationDone = useAppSelector(state => state.auth.registrationDone);
    const dispatch = useAppDispatch();

    //локальный стейт для видимости паролей
    const [values, setValues] = React.useState<State>({
        showPassword: false,
        showConfirmPassword: false,
    });
    //колбэк функция - изменение стейта видимости паролей
    const handleClickShowPassword = (setting: string) => {
        if (setting === 'showPassword') {
            setValues({
                ...values,
                showPassword: !values.showPassword,
            });
        } else if (setting === 'showConfirmPassword') {
            setValues({
                ...values,
                showConfirmPassword: !values.showConfirmPassword,
            });
        }
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    //хук библиотеки Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: values => {
            const errors: FormikRegErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 3) {
                errors.password = 'Must be 4 characters or more';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Passwords must be same';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(setRegistrationTC(values.email, values.password));
        },
    });
    //проверка успешной регистрации пользователя (при значении registrationDone - True) - навигация на страницу Login
    if (registrationDone) {
        return <Navigate to={PATH.LOGIN} />;
    }

    return (
        <Grid container className={styles.container}>
            <ErrorSnackbars />
            <form onSubmit={formik.handleSubmit}>
                <FormControl
                    className={styles.signUpForm}
                    style={{ border: '1px white solid' }}
                >
                    <h1>Sign Up</h1>
                    <FormGroup className={styles.signUpFormGroup}>
                        <FormControl
                            className={styles.signUpFormGroupInput}
                            variant="standard"
                        >
                            <InputLabel htmlFor="standard-adornment-password">
                                Email
                            </InputLabel>
                            <Input
                                id="standard-adornment-weight"
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: 'red' }}>{formik.errors.email}</div>
                            ) : null}
                        </FormControl>
                        <FormControl
                            className={styles.signUpFormGroupInput}
                            variant="standard"
                        >
                            <InputLabel htmlFor="standard-adornment-password">
                                Password
                            </InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                handleClickShowPassword('showPassword')
                                            }
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div style={{ color: 'red' }}>
                                    {formik.errors.password}
                                </div>
                            ) : null}
                        </FormControl>
                        <FormControl
                            className={styles.signUpFormGroupInput}
                            variant="standard"
                        >
                            <InputLabel htmlFor="standard-adornment-password">
                                Confirm password
                            </InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={values.showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                handleClickShowPassword(
                                                    'showConfirmPassword',
                                                )
                                            }
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showConfirmPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                {...formik.getFieldProps('confirmPassword')}
                            />
                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword ? (
                                <div style={{ color: 'red' }}>
                                    {formik.errors.confirmPassword}
                                </div>
                            ) : null}
                        </FormControl>
                    </FormGroup>
                    <FormGroup className={styles.signUpFormGroup}>
                        <Button
                            type={'submit'}
                            className={styles.submitButton}
                            style={{
                                color: 'white',
                                backgroundColor: '#366EFF',
                                borderRadius: '30px',
                                height: '40px',
                                boxShadow:
                                    '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
                                fontSize: '16px',
                                textTransform: 'capitalize',
                            }}
                        >
                            Sing Up
                        </Button>
                        <p>Already have an account?</p>
                        <NavLink to={PATH.LOGIN}>Sign In</NavLink>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    );
};
