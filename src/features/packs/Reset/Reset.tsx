import React, { memo } from 'react';
import s from './Reset.module.css';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { resetFilterTC } from '../Packs-reducer';

export const Reset = memo(() => {
    const dispatch = useAppDispatch();

    const onClickHandler = () => dispatch(resetFilterTC());

    return (
        <div className={s.filter}>
            <div className={s.filterBox}>
                <FilterAltOffIcon sx={{ cursor: 'pointer' }} onClick={onClickHandler} />
            </div>
        </div>
    );
});
