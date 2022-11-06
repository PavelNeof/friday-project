import { NavLink } from 'react-router-dom';
import { PATH } from '../../routing/Route/Route';
import WestIcon from '@mui/icons-material/West';
import React from 'react';
import styles from './BackToPackList.module.css';

export const BackToPackList = () => {
    return (
        <NavLink to={PATH.PACKS} style={{}} className={styles.back}>
            <WestIcon /> Back to Pack List
        </NavLink>
    );
};
