import React, { memo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { changeSearchAC } from '../Packs-reducer';
import useDebounce from '../../../common/hooks/useDebounce';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';

export const Search = memo(() => {
    const search = useAppSelector(state => state.packs.search);
    const dispatch = useAppDispatch();

    const [text, setText] = useState<string>(search);
    const debouncedText = useDebounce<string>(text, 1000);

    useEffect(() => {
        dispatch(changeSearchAC(debouncedText));
    }, [debouncedText]);

    useEffect(() => {
        setText(search);
    }, [search]);

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
});
