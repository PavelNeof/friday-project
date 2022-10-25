import React from 'react';
import s from './Slider.module.css';
import { Box, Slider as SliderMUI } from '@mui/material';

export const Slider = () => {
    const [value, setValue] = React.useState<number[]>([0, 100]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    function valuetext(value: number) {
        return `${value}`;
    }

    return (
        <div>
            <div>Number of cards</div>
            <div className={s.slider}>
                <div className={s.number}> 1</div>
                <Box sx={{ width: 200, padding: '0 10px' }}>
                    <SliderMUI
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Box>
                <div className={s.number}> 10</div>
            </div>
        </div>
    );
};
