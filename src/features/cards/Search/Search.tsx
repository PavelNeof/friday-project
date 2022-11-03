import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import useDebounce from '../../../common/hooks/useDebounce';
import { changeSearchCardsAC } from '../cards-reducer';

export const Search = () => {
    const search = useAppSelector(state => state.cards.search);
    const dispatch = useAppDispatch();

    const [text, setText] = useState<string>(search);
    const debouncedText = useDebounce<string>(text, 1000);

    useEffect(() => {
        dispatch(changeSearchCardsAC(debouncedText));
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
                    sx={{ width: '465px' }}
                    value={text}
                    onChange={onChangeHandler}
                />
            </div>
        </div>
    );
};
