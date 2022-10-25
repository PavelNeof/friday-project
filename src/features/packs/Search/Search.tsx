import React from 'react';
import s from './Search.module.css';

export const Search = () => {
    return (
        <div>
            <div>Search</div>
            <div>
                <input className={s.input} placeholder={'Provide your text'} />
            </div>
        </div>
    );
};
