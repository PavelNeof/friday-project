import React from 'react';
import s from '../Packs.module.css';
import style from './AddNewPack.module.css';
import { Button } from '@mui/material';
import { BackToPackList } from '../../../common/components/BackToPackList';

export const AddNewPack = () => {
    return (
        <div className={s.container}>
            <BackToPackList />
            <h1>Name Pack</h1>
            <div className={style.addNewCardCentre}>
                <div className={style.oneUnderTheOther}>
                    <div style={{ color: '#868686FF' }}>
                        This pack empty. Click add new card to fill this pack
                    </div>
                    <div className={style.button}>
                        <Button
                            style={{
                                color: 'white',
                                backgroundColor: '#366EFF',
                                boxShadow:
                                    '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
                                borderRadius: '30px',
                                padding: '5px 25px 5px 25px',
                                fontFamily: 'Montserrat',
                                textTransform: 'capitalize',
                                marginTop: '40px',
                            }}
                        >
                            Add new card
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
