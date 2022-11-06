import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Delete} from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import {updateNamePackTC} from "../../../features/packs/Packs-reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useState} from "react";

type BasicPopoverType = {
    isEdit:boolean
    setIsEdit:() => void

}

export default function BasicPopover(props: BasicPopoverType) {

    const dispatch = useAppDispatch();

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

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // <label >
    //     <div /*onClick={handleClick}*/>
    //         <IconButton>
    //             <ErrorOutlineIcon/>
    //         </IconButton>
    //     </div>
    // </label>

    return (
        <div>

            <Button aria-describedby={id} variant="contained" onClick={handleClick1}>
                Open Popover
            </Button>
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
                        <BorderColorIcon/> Edit
                    </IconButton>
                </Typography>
                <Typography sx={{p: 2}}>
                    <div style={{color: '#757575'}}>
                        <Delete/> Delete
                    </div>
                </Typography>
                <Typography sx={{p: 2}}>
                    <div style={{color: '#757575'}}>
                        <SchoolIcon/> Learn
                    </div>
                </Typography>
            </Popover>
        </div>
    );
}