import {IconButton} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Delete} from "@mui/icons-material";
import React, {useState} from "react";
import SchoolIcon from '@mui/icons-material/School';
import {useAppSelector} from "../../app/store";
import {EditCardModal} from "./EditCardModal";
import {DeleteCardModal} from "./DeleteCardModal";


type RenderCellCardComponent = {
    id:string
    name:string
}

export const RenderCellCardComponent = (props:RenderCellCardComponent) =>{

    //const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.app.status);

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)


    const updateCardHandler = (cardId: string) => {
        setIsEdit(true)
        //console.log(props.id)
        //dispatch(updateCardTC(cardId, 'New question is cool! Before it was too boring'));
    };

    const deleteCardHandler = (cardId: string) => {
        //dispatch(deleteCardTC(cardId));
        setIsDelete(true)
    };

    return (
        <div>

            {isEdit && <EditCardModal id={props.id} name={props.name} setIsEdit={setIsEdit} isEdit={isEdit}/>}
            {isDelete && <DeleteCardModal id={props.id} name={props.name} setIsDelete={setIsDelete} isDelete={isDelete}/>}

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