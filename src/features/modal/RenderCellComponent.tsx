import React, {useState} from 'react'
import {EditPackModal} from "./EditPackModal";
import {IconButton} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Delete} from "@mui/icons-material";
import {useAppSelector} from "../../app/store";
import {DeletePackModal} from "./DeletePackModal";

export const RenderCellComponent = (props: any) => {

    const status = useAppSelector(state => state.app.status);

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    return (
        <div>
            {isEdit && <EditPackModal id={props.id} name={props.name} setIsEdit={setIsEdit} isEdit={isEdit}/>}
            {isDelete && <DeletePackModal id={props.id} name={props.name} setIsDelete={setIsDelete} isDelete={isDelete}/>}
            <IconButton disabled={status === 'loading'}>
                <SchoolIcon/>
            </IconButton>
            <IconButton
                onClick={() => setIsEdit(true)}
                disabled={status === 'loading'}
            >
                <BorderColorIcon/>
            </IconButton>
            <IconButton
                onClick={() => setIsDelete(true)}
                disabled={status === 'loading'}
            >
                <Delete/>
            </IconButton>
        </div>
    )
}