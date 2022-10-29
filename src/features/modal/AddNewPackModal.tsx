import BasicModal from "./BasicModal";
import React from "react";
import {useAppDispatch} from "../../app/store";
import {addNewPackTC} from "../packs/Packs-reducer";
import {addNewPackModalAC} from "./modal-reducer";


export const AddNewPackModal = () => {
    const dispatch = useAppDispatch();



    const addPackHandler = () => {
        dispatch(addNewPackTC('Pack name'))
        ;
    };
    const closePack = () => {
        dispatch(addNewPackModalAC(false))
        ;
    };


    return(
        <BasicModal>
            <div>
                <div>asdasdasdasdasdasd</div>
                <button onClick={addPackHandler}> add new pack </button>
                <button onClick={closePack}> close </button>
            </div>
        </BasicModal>
    )
}