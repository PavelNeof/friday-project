import React, { memo, useEffect } from 'react';
import s from './Slider.module.css';
import { Box, Slider as SliderMUI } from '@mui/material';
import { changeMinMaxCurrentAC } from '../Packs-reducer';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';

export const Slider = memo(() => {
    const dispatch = useAppDispatch();

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
    const minMaxCardsCount = useAppSelector(state => state.packs.minMaxCardsCount);

    const [value, setValue] = React.useState<number[]>([minCardsCount, maxCardsCount]);

    useEffect(() => {
        setValue(minMaxCardsCount);
    }, [minMaxCardsCount, dispatch]);

    useEffect(() => {
        setValue([minCardsCount, maxCardsCount]);
    }, [minCardsCount, maxCardsCount]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleChangeCommitted = (
        event: Event | React.SyntheticEvent<Element, Event>,
        value: number | number[],
    ) => {
        if (Array.isArray(value)) {
            dispatch(changeMinMaxCurrentAC(value));
        }
    };

    return (
        <div>
            <div>Number of cards</div>
            <div className={s.slider}>
                <div className={s.number}>{value[0]}</div>
                <Box sx={{ width: 200, padding: '0 10px' }}>
                    <SliderMUI
                        getAriaLabel={() => 'Packs range'}
                        value={value}
                        min={minCardsCount}
                        max={maxCardsCount}
                        valueLabelDisplay="auto"
                        onChange={handleChange}
                        onChangeCommitted={handleChangeCommitted}
                        disableSwap
                    />
                </Box>
                <div className={s.number}>{value[1]}</div>
            </div>
        </div>
    );
});
