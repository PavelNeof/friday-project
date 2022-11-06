import {NavLink} from 'react-router-dom';
import {PATH} from '../../routing/Route/Route';
import WestIcon from '@mui/icons-material/West';
import React from 'react';
import styles from './BackToPackList.module.css';
import IconButton from "@mui/material/IconButton";

export const BackToPackList = () => {
    return (
        <div>

            <NavLink
                to={PATH.PACKS}
                style={{
                    textDecoration: 'none',
                    color: 'black',
                }}
            >
                <div className={styles.back}>
                    <IconButton>
                        <WestIcon/>
                    </IconButton>
                    Back to Pack List
                </div>

            </NavLink>
        </div>
    );
};
