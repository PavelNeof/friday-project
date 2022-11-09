import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Delete} from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import {deletePackTC} from "../../../features/packs/Packs-reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../routing/Route/Route";
import s from "../Header/Header.module.css";
import {useAppSelector} from "../../hooks/useAppSelector";

type BasicPopoverType = {

}

export default function PopoverHeader(props: BasicPopoverType) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);


    const handleClick1 = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
        console.log("button: ")
        console.log(event)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const status = useAppSelector(state => state.app.status);
    const avatar = useAppSelector(state => state.auth.data.avatar);
    const name = useAppSelector(state => state.auth.data.name);

    const profileTapHandler = () => {
        navigate(PATH.PROFILE)
    }

    const packListTapHandler = () => {
        navigate(PATH.PACKS)
    }

    return (
        <div>

            <div >
                {isLoggedIn ? (
                        <div className={s.block} onClick={handleClick1}>
                            <div className={s.name}>{name}</div>
                            {avatar
                                ? <img className={s.avatar} src={avatar} alt="avatar"/>
                                : <div className={s.avatarNoPhoto}></div>}
                        </div>
                ) : (
                    <NavLink
                        to={PATH.LOGIN}
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                        }}
                    >
                        Sign In
                    </NavLink>
                )}
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{p: 1}}>
                   <button onClick={profileTapHandler}>Profile</button>

                </Typography>
                    <Typography sx={{p: 1}}>
                   <button onClick={packListTapHandler}>Packs List</button>
                </Typography>
            </Popover>
        </div>
    );
}