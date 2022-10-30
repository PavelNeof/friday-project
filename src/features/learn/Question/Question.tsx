import React from 'react';
import styles from './Question.module.css';
import { Button } from '@mui/material';

type QuestionType = {
    showAnswer: (show: boolean) => void;
};

export const Question = ({ showAnswer }: QuestionType) => {
    const showAnswerHandler = () => {
        showAnswer(true);
    };

    return (
        <div className={styles.questionForm}>
            <div className={styles.question}>
                <div>
                    <strong>Question: </strong>
                    {}
                </div>
                <div className={styles.tries}>
                    Количество попыток ответов на вопрос: <strong>{}</strong>
                </div>
            </div>
            <Button className={styles.buttonShow} onClick={showAnswerHandler} style={{}}>
                Show answer
            </Button>
        </div>
    );
};
