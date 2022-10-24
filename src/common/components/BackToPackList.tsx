import { NavLink } from 'react-router-dom';
import { PATH } from '../routing/Route/Route';
import WestIcon from '@mui/icons-material/West';
import React from 'react';

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
                <WestIcon /> Back to Pack List
            </NavLink>
        </div>
    );
};
