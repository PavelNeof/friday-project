import React, { ChangeEvent, useState } from 'react';
import { AppStateType, useAppDispatch } from '../../layers/bll/store';
import { forgotPasswordTC } from '../../layers/bll/auth-reducer';
import { useSelector } from 'react-redux';

export const ForgotPassword = () => {
    let [newEmail, setNewEmail] = useState('');
    const disable = useSelector<AppStateType, boolean>(state => state.auth.disableButton);

    const dispatch = useAppDispatch();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.currentTarget.value);
    };

    const onClickHandler = () => {
        dispatch(forgotPasswordTC(newEmail));
    };

    return (
        <>
            <div>
                Your email:
                <input onChange={onChangeHandler} value={newEmail} />
            </div>
            <button disabled={disable} onClick={onClickHandler}>
                Send
            </button>
        </>
    );
};
