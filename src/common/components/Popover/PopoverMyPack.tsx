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
import {useNavigate} from "react-router-dom";
import {PATH} from "../../routing/Route/Route";

type BasicPopoverType = {
    isEdit: boolean
    setIsEdit: () => void
    cardPackId: string | undefined
}

export default function BasicPopover(props: BasicPopoverType) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);


    // const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     console.log(event)
    //     setAnchorEl(event.currentTarget);
    // };

    const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);

        console.log("button: ")
        console.log(event)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isEditHandler = () => {
        handleClose();
        props.setIsEdit();
    }

    const isDeleteHandler = () => {
        props.cardPackId && dispatch(deletePackTC(props.cardPackId))
        navigate(PATH.PACKS)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <div>
            <IconButton onClick={handleClick1}>
                <ErrorOutlineIcon/>
            </IconButton>

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
                <Typography sx={{p: 2}}>
                    <IconButton onClick={isEditHandler}>
                        <BorderColorIcon/> Edit name
                    </IconButton>
                </Typography>
                <Typography sx={{p: 2}}>
                    <IconButton onClick={isDeleteHandler}>
                        <Delete/> Delete
                    </IconButton>
                </Typography>
                <Typography sx={{p: 2}}>
                    <IconButton style={{color: '#757575'}}>
                        <SchoolIcon/> Learn
                    </IconButton>
                </Typography>
            </Popover>
        </div>
    );
}