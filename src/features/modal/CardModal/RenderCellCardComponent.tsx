import {IconButton} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Delete} from "@mui/icons-material";
import React, {useState} from "react";
import SchoolIcon from '@mui/icons-material/School';
import {useAppSelector} from "../../../app/store";
import {EditCardModal} from "./EditCardModal";
import {DeleteCardModal} from "./DeleteCardModal";

type RenderCellCardComponent = {
    id:string
    name:string
    answer:string
    cardPackId: string | undefined
}
export const RenderCellCardComponent = (props:RenderCellCardComponent) =>{

    const status = useAppSelector(state => state.app.status);

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)


    const updateCardHandler = () => {
        setIsEdit(true)
    };

    const deleteCardHandler = () => {
        setIsDelete(true)
    };

    return (
        <div>
            {isEdit && <EditCardModal id={props.id} name={props.name} answer={props.answer}
                                      setIsEdit={setIsEdit} isEdit={isEdit} cardPackId={props.cardPackId}/>}

            {isDelete && <DeleteCardModal id={props.id} name={props.name} setIsDelete={setIsDelete} isDelete={isDelete}/>}

            <IconButton disabled={status === 'loading'}>
                            <SchoolIcon />
                        </IconButton>
            <IconButton
                onClick={() => updateCardHandler()}
                disabled={status === 'loading'}
            >
                <BorderColorIcon />
            </IconButton>
            <IconButton
                onClick={() => deleteCardHandler()}
                disabled={status === 'loading'}
            >
                <Delete />
            </IconButton>
        </div>
    );
}