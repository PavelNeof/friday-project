import {ChangeEvent, useEffect, useState} from 'react';
import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {AppStateType} from '../../app/store';
import {logoutTC, updateAvatar, updateName} from '../auth/auth-reducer';
import {PATH} from '../../common/routing/Route/Route';
import {Button, FormControl, Grid} from '@mui/material';
import styles from '../auth/Registration/Registration.module.css';
import styleProfile from './Profile.module.css';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {InputTypeFile} from "../../common/components/InputTypeFile/InputTypeFile";

export const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const name = useAppSelector(state => state.auth.data.name);
    const email = useAppSelector(state => state.auth.data.email);
    const avatar = useAppSelector(state => state.auth.data.avatar);
    const disable = useAppSelector(state => state.auth.disableButton);

    const dispatch = useAppDispatch();

    let [editMode, setEditMode] = useState(false);
    let [currentName, setCurrentName] = useState(name);

    useEffect(() => {
        setCurrentName(currentName);
    }, [currentName]);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateName(currentName));
    };

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setCurrentName(e.currentTarget.value);
    };

    const onClickHandler = () => {
        dispatch(logoutTC());
    };

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>;
    }

    const inputDispatchAvatar = (avatar: string) =>{
        dispatch(updateAvatar(avatar))
    }


    return (
        <>
            <Grid container className={styles.container}>
                <FormControl
                    className={styles.signUpForm}
                    style={{border: '1px white solid'}}
                >
                    <div className={styleProfile.profile}>
                        <h1>Personal Information</h1>
                        <div>
                            {avatar
                                ? <img className={styleProfile.avatar} src={avatar} alt="avatar"/>
                                : <div className={styleProfile.avatarNoPhoto}></div>}
                            <InputTypeFile save={ inputDispatchAvatar }>
                                <IconButton component="span" className={styleProfile.iconButton}>
                                    <AddAPhotoIcon />
                                </IconButton>
                            </InputTypeFile>
                        </div>

                        <div>
                            {!editMode && (
                                <div>
                                    <span onDoubleClick={activateEditMode}>
                                        {currentName || email || '---'}
                                    </span>
                                    <span
                                        style={{color: '#414141'}}
                                        onClick={activateEditMode}
                                    >
                                        {' '}
                                        <BorderColorIcon/>{' '}
                                    </span>
                                </div>
                            )}
                            {editMode && (
                                <div>
                                    <input
                                        autoFocus={true}
                                        onChange={onNameChange}
                                        onBlur={deactivateEditMode}
                                        value={currentName}
                                    />
                                    <button
                                        onClick={deactivateEditMode}
                                        style={{
                                            backgroundColor: '#366eff',
                                            color: 'white',
                                            border: '#366eff',
                                        }}
                                    >
                                        SAVE
                                    </button>
                                </div>
                            )}
                        </div>

                        <span style={{color: '#868686FF'}}> {email} </span>
                        <Button
                            style={{
                                color: 'black',
                                backgroundColor: '#ffffff',
                                boxShadow:
                                    '0px 4px 18px rgba(54, 110, 255, 0.6), inset 0px 1px 0px rgba(255, 255, 255, 0.5)',
                                borderRadius: '30px',
                                padding: '5px 25px 5px 25px',
                                fontFamily: 'Montserrat',
                                textTransform: 'capitalize',
                            }}
                            disabled={disable}
                            onClick={onClickHandler}
                        >
                            LogOut
                        </Button>
                    </div>
                </FormControl>
            </Grid>
        </>
    );
};
