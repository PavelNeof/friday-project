import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {ReactNode} from "react";
import zIndex from "@mui/material/styles/zIndex";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {isOpenModalAC} from "./modal-reducer";
import s from "./BasicModal.module.css"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex: 10,
};

type PropsType = {
    children: ReactNode
}

export default function BasicModal(props: PropsType) {

    const dispatch = useAppDispatch();

    const isOpen = useAppSelector(state => state.modal.isOpen)

    const handleClose = (event: object, reason: string) => {
        if (reason === "backdropClick") {
            console.log(reason)
            dispatch(isOpenModalAC(false));
        }
    }


    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={s.container}>
                    {props.children}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}