import BasicModal from '../BasicModal/BasicModal';
import { deleteCardTC } from '../../cards/cards-reducer';
import s from '../BasicModal/BasicModal.module.css';
import { Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';

type DeleteCardModalType = {
    id: string;
    name: string;
    setIsDelete: (value: boolean) => void;
    isDelete: boolean;
};

export const DeleteCardModal = (props: DeleteCardModalType) => {
    const dispatch = useAppDispatch();

    const deleteCardHandler = (cardId: string) => {
        dispatch(deleteCardTC(cardId));
        props.setIsDelete(false);
    };

    const closePack = () => {
        props.setIsDelete(false);
    };

    return (
        <BasicModal isOpen={props.isDelete} setIsOpen={props.setIsDelete}>
            <div className={s.modalContainer}>
                <div className={s.text}>Delete pack</div>
                <div>
                    Do you really want to remove{' '}
                    <span style={{ fontWeight: 'bold' }}>{props.name}</span>? All cards
                    will be deleted.
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
                            backgroundColor: '#FF3636',
                            borderRadius: '30px',
                            height: '40px',
                            boxShadow:
                                '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
                            fontSize: '16px',
                            textTransform: 'capitalize',
                            width: '113px',
                        }}
                        onClick={() => deleteCardHandler(props.id)}
                    >
                        {' '}
                        Delete
                    </Button>
                </div>
            </div>
        </BasicModal>
    );
};
