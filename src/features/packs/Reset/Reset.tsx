import React from 'react';
import s from './Reset.module.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Reset = () => {
    return (
        <div className={s.filter}>
            <div className={s.filterBox}>
                <FilterAltIcon />
            </div>
        </div>
    );
};

export default Reset;
