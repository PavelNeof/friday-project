import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from '../../../app/store';
import { changeSearchAC } from '../Packs-reducer';
import useDebounce from '../../../common/hooks/useDebounce';

export const Search = () => {
    const [text, setText] = useState<string>('');
    const debouncedText = useDebounce<string>(text, 1000);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeSearchAC(debouncedText));
    }, [debouncedText]);

    const onChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setText(e.currentTarget.value);
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
                    value={text}
                    onChange={onChangeHandler}
                />
            </div>
        </div>
    );
};
