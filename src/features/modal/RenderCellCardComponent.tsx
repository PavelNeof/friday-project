import {IconButton} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Delete} from "@mui/icons-material";
import React, {useState} from "react";
import {deleteCardTC, updateCardTC} from "../cards/cards-reducer";
import SchoolIcon from '@mui/icons-material/School';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {EditCardModal} from "./EditCardModal";



export const RenderCellCardComponent = (props:any) =>{

    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.app.status);

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)


    const updateCardHandler = (cardId: string) => {
        setIsEdit(true)
        //console.log(props.id)
        //dispatch(updateCardTC(cardId, 'New question is cool! Before it was too boring'));
    };

    const deleteCardHandler = (cardId: string) => {
        dispatch(deleteCardTC(cardId));
    };

    return (
        <div>

            {isEdit && <EditCardModal id={props.id} name={props.name} setIsEdit={setIsEdit} isEdit={isEdit}/>}
            {/*{isDelete && <DeleteCackModal id={props.id} setIsDelete={setIsDelete} isDelete={isDelete}/>}*/}

            <IconButton disabled={status === 'loading'}>
                            <SchoolIcon />
                        </IconButton>
            <IconButton
                onClick={() => updateCardHandler(props.id)}
                disabled={status === 'loading'}
            >
                <BorderColorIcon />
            </IconButton>
            <IconButton
                onClick={() => deleteCardHandler(props.id)}
                disabled={status === 'loading'}
            >
                <Delete />
            </IconButton>
        </div>
    );
}