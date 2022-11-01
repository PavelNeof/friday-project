import React from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Navigate, NavLink } from 'react-router-dom';
import { PATH } from '../../../common/routing/Route/Route';
import { useFormik } from 'formik';
import styles from '../Registration/Registration.module.css';
import { loginTC } from '../auth-reducer';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';

type FormikLogErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

function Login() {
    const [values, setValues] = React.useState<boolean>(false);

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    const handleClickShowPassword = () => {
        setValues(!values);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikLogErrorType = {};
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
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    });

    if (isLoggedIn) {
        return <Navigate to={PATH.PACKS} />;
    }

    return (
        <Grid container className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl
                    className={styles.signUpForm}
                    style={{ border: '1px white solid' }}
                >
                    <h1>Sign In</h1>
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
                                type={values ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values ? <VisibilityOff /> : <Visibility />}
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
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        {...formik.getFieldProps('rememberMe')}
                                        checked={formik.values.rememberMe}
                                        style={{ fontFamily: 'Montserrat' }}
                                    />
                                }
                            />
                            <p className={styles.right}>
                                <NavLink to={PATH.FORGOT_PASSWORD}>
                                    Forgot Password?
                                </NavLink>
                            </p>
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
                            Sing In
                        </Button>
                        <p>Already have an account?</p>
                        <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    );
}

export default Login;
