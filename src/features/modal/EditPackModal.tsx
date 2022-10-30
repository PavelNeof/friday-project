import BasicModal from "./BasicModal";
import React, {ChangeEvent, useState} from "react";
import {AppStateType, useAppDispatch, useAppSelector} from "../../app/store";
import {addNewPackTC, updateNamePackTC} from "../packs/Packs-reducer";
import {addNewPackModalAC, editPackModalAC, isOpenModalAC} from "./modal-reducer";
import {useSelector} from "react-redux";
import s from "./BasicModal.module.css"
import {Button} from "@mui/material";

export const EditPackModal = (props:any) => {
    //console.log(props.pack)
    const dispatch = useAppDispatch();

    // const idPack = useAppSelector(state => state.packs.cardPacks)
    // console.log(idPack)

    let [currentName, setCurrentName] = useState(props.name);

    const updateNamePackHandler = (id: string) => {
        dispatch(updateNamePackTC(id, currentName));
        props.setIsEdit(false)
      //  dispatch(isOpenModalAC(false));
    };

    const closePack = () => {
        props.setIsEdit(false)
      //  dispatch(editPackModalAC(false))
      //  dispatch(isOpenModalAC(false));
    };

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentName(e.currentTarget.value);
    };

    return (
        <BasicModal isOpen={props.isEdit} setIsOpen={props.setIsEdit} >
            <div className={s.modalContainer}>
                <div className={s.text}>Edit pack</div>
                <div>
                    <input onChange={onNameChange}
                           value={currentName}
                           placeholder={'Name Pack'}
                           className={s.input}/>
                </div>
                <div className={s.text}><input type={'checkbox'}/>
                    Private pack
                </div>
                <div className={s.divButton}>
                    <Button
                        style={{
                            color: 'black',
                            backgroundColor: '#ffffff',
                            borderRadius: '30px',
                            height: '40px',
                            boxShadow:
                                '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
                            fontSize: '16px',
                            textTransform: 'capitalize',
                            width: '113px',
                        }} onClick={closePack}> Cansel</Button>
                    <Button
                        style={{
                            color: 'white',
                            backgroundColor: '#366EFF',
                            borderRadius: '30px',
                            height: '40px',
                            boxShadow:
                                '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
                            fontSize: '16px',
                            textTransform: 'capitalize',
                            width: '113px',
                        }} onClick={()=>updateNamePackHandler(props.id)}> Save</Button>
                </div>
            </div>
        </BasicModal>
    )
}