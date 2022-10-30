import React, { useState } from 'react';
import styles from './Learn.module.css';
import ErrorSnackbars from '../../common/components/ErrorSnackbars/ErrorSnackbars';
import { Grid } from '@mui/material';
import { Question } from './Question/Question';
import { Answer } from './Answer/Answer';
import { BackToPackList } from '../../common/components/BackToPackList/BackToPackList';
import { useAppSelector } from '../../app/store';

export const Learn = () => {
    const packName = useAppSelector(state => state.cards.packName);

    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className={styles.learn}>
            <BackToPackList />
            <Grid container className={styles.container}>
                <h1>Learn: "{packName}"</h1>
                <ErrorSnackbars />
                {showAnswer ? (
                    <Answer showAnswer={setShowAnswer} />
                ) : (
                    <Question showAnswer={setShowAnswer} />
                )}
            </Grid>
        </div>
    );
};
