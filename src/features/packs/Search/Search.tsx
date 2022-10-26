import React from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { changeSearchAC } from '../Packs-reducer';

export const Search = () => {
    const search = useAppSelector(state => state.packs.search);
    const dispatch = useAppDispatch();

    const onChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(changeSearchAC(e.currentTarget.value));
    };

    return (
        <div>
            <div>Search</div>
            <div>
                <TextField
                    type="search"
                    size="small"
                    placeholder="Search by pack name"
                    sx={{ width: '465px', marginBottom: '8px' }}
                    value={search}
                    onChange={onChangeHandler}
                />
            </div>
        </div>
    );
};
