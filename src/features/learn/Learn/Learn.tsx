import React, { useEffect, useState } from 'react';
import styles from './Learn.module.css';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import { CardType, updateGradeCardTC } from '../../cards/cards-reducer';
import ErrorSnackbars from '../../../common/components/ErrorSnackbars/ErrorSnackbars';
import { Answer } from '../Answer/Answer';
import { getCard } from '../../../common/getCard/GetCard';

export const Learn = () => {
    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.cards.cards);
    const packName = useAppSelector(state => state.cards.packName);

    const [showAnswer, setShowAnswer] = useState(false);
    const [card, setCard] = useState<CardType>();
    const [grade, setGrade] = useState(0);

    useEffect(() => {
        const card = getCard(cards);
        setCard(card);
    }, []);

    const getQuestionHandler = () => {
        dispatch(updateGradeCardTC(grade, card?._id));
        const newCard = getCard(cards);
        setCard(newCard);
        setShowAnswer(!showAnswer);
    };
    const getAnswerHandler = () => {
        setShowAnswer(!showAnswer);
    };

    return (
        <div className={styles.container}>
            <h1>Learn: "{packName}"</h1>
            <ErrorSnackbars />
            <div className={styles.learnForm}>
                <div className={styles.question}>
                    <div>
                        <strong>Question: </strong>
                        {card?.question}
                    </div>
                    <div className={styles.tries}>
                        Количество попыток ответов на вопрос:{' '}
                        <strong>{card?.shots}</strong>
                    </div>
                </div>
                {showAnswer ? (
                    <Answer card={card} setGrade={value => setGrade(value)} />
                ) : (
                    ''
                )}
                {showAnswer ? (
                    <Button
                        className={styles.button}
                        onClick={getQuestionHandler}
                        disabled={!grade}
                    >
                        Next
                    </Button>
                ) : (
                    <Button className={styles.button} onClick={getAnswerHandler}>
                        Show answer
                    </Button>
                )}
            </div>
        </div>
    );
};
