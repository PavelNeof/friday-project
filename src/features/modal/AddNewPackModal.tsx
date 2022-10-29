import BasicModal from "./BasicModal";
import React, {ChangeEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {addNewPackTC} from "../packs/Packs-reducer";
import {addNewPackModalAC} from "./modal-reducer";


export const AddNewPackModal = () => {
    const dispatch = useAppDispatch();

    let [currentName, setCurrentName] = useState('asdasd');

    const addPackHandler = () => {
        dispatch(addNewPackTC('Pack name'))
        ;
    };
    const closePack = () => {
        dispatch(addNewPackModalAC(false))
        ;
    };

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setCurrentName(e.currentTarget.value);
    };

    return(
        <BasicModal>
            <div>
                <div>Add new Pack</div>
                <input onChange={onNameChange}
                       onBlur={closePack}
                       value={currentName}/>
                <button onClick={addPackHandler}> add new pack </button>
                <button onClick={closePack}> close </button>
            </div>
        </BasicModal>
    )
}