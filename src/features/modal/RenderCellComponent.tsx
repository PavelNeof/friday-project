import React, {useState} from 'react'
import {EditPackModal} from "./EditPackModal";
import {IconButton} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Delete} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {deletePackTC, updateNamePackTC} from "../packs/Packs-reducer";
import {editPackModalAC, isOpenModalAC} from "./modal-reducer";
import {DeletePackModal} from "./DeletePackModal";

export const RenderCellComponent = (props: any) => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.app.status);

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

console.log(isDelete)
    const deletePackHandler = (id: string) => {
        dispatch(deletePackTC(id));
        setIsEdit(false)
    };
    // const updateNamePackHandler = (id: string, name:string) => {
    //           dispatch(updateNamePackTC(id, name));
    //          // dispatch(updateNamePackTC(id, 'New name'));
    //    // dispatch(editPackModalAC(true))
    //     dispatch(isOpenModalAC(true))
    //      setIsEdit(false)
    //
    // };

    return (
        <div>
            {isEdit && <EditPackModal id={props.id} name={props.name} setIsEdit={setIsEdit} isEdit={isEdit}/>}
            {isDelete && <DeletePackModal id={props.id} setIsDelete={setIsDelete} isDelete={isDelete}/>}
            <IconButton disabled={status === 'loading'}>
                <SchoolIcon />
            </IconButton>
            <IconButton
               // onClick={() => updateNamePackHandler(props.id, props.name)}
                  onClick={() => setIsEdit(true)}
                disabled={status === 'loading'}
            >
                <BorderColorIcon />
            </IconButton>
            <IconButton
                onClick={() => setIsDelete(true)}
                disabled={status === 'loading'}
            >
                <Delete />
            </IconButton>
        </div>
    )
}