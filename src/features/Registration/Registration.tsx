import React from 'react'
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../layers/bll/store";
import {useFormik} from "formik";
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    Input,
    InputAdornment, InputLabel,
    TextField
} from "@mui/material";
import {PATH} from "../../common/Routing/Route/Route";
import {setRegistrationTC} from "../../layers/bll/auth-reducer";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type FormikRegErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {
    const isLoggedIn = useAppSelector(
        (state) => state.auth.isLoggedIn
    );
    const registrationError = useAppSelector(state => state.auth.registrationError)
    const dispatch = useAppDispatch()

    interface State {
        amount: string;
        password: string;
        weight: string;
        weightRange: string;
        showPassword: boolean;
    }

    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: FormikRegErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 3) {
                errors.password = 'Must be 4 characters or more'
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required'
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Passwords must be same'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(setRegistrationTC(values.email, values.password))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p><strong>Sign Up</strong></p>
                        </FormLabel>
                        <FormGroup>
                            <p>Email</p>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            {registrationError && <div style={{color: 'red'}}>{registrationError}</div>}
                            <p>Password</p>
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                            <p>Confirm password</p>
                            <TextField
                                type="password"
                                label="Confirm password"
                                margin="normal"
                                {...formik.getFieldProps('confirmPassword')}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}

                            <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Sing Up
                            </Button>
                            <p>Already have an account?</p>
                            <NavLink to={PATH.LOGIN}>Sign In</NavLink>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}