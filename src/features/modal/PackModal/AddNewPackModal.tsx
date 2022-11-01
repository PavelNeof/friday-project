import BasicModal from '../BasicModal/BasicModal';
import React, { ChangeEvent, useState } from 'react';
import { addNewPackTC } from '../../packs/Packs-reducer';
import s from '../BasicModal/BasicModal.module.css';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';

type AddNewPackModalType = {
    isAddPack: boolean;
    setIsAddPack: (value: boolean) => void;
};

export const AddNewPackModal = (props: AddNewPackModalType) => {
    const dispatch = useAppDispatch();

    let [currentName, setCurrentName] = useState('');

    const addPackHandler = () => {
        dispatch(addNewPackTC(currentName));
        props.setIsAddPack(false);
    };

    const closePack = () => {
        props.setIsAddPack(false);
    };

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setCurrentName(e.currentTarget.value);
    };

    return (
        <BasicModal isOpen={props.isAddPack} setIsOpen={props.setIsAddPack}>
            <div className={s.modalContainer}>
                <div className={s.text}>Add new Pack</div>
                <div>
                    <input
                        onChange={onNameChange}
                        value={currentName}
                        placeholder={'Name Pack'}
                        className={s.input}
                    />
                </div>
                <div className={s.text}>
                    <input type={'checkbox'} />
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
                        }}
                        onClick={closePack}
                    >
                        {' '}
                        Cansel
                    </Button>
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
                        }}
                        onClick={addPackHandler}
                    >
                        {' '}
                        Save
                    </Button>
                </div>
            </div>
        </BasicModal>
    );
};
