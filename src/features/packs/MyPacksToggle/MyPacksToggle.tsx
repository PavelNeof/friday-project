import React from 'react';
import { Button } from '@mui/material';
import { changeIsMyPacksAC } from '../Packs-reducer';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';

export const MyPacksToggle = () => {
    const isMyPacks = useAppSelector(state => state.packs.isMyPacks);
    const dispatch = useAppDispatch();

    const my = isMyPacks ? 'contained' : 'outlined';
    const all = isMyPacks ? 'outlined' : 'contained';

    const toggle = (value: boolean) => dispatch(changeIsMyPacksAC(value));

    return (
        <div>
            <div>Show packs cards</div>
            <div>
                <Button variant={my} onClick={() => toggle(true)}>
                    My
                </Button>
                <Button variant={all} onClick={() => toggle(false)}>
                    All
                </Button>
            </div>
        </div>
    );
};
