import React from 'react';
import styles from './Answer.module.css';
import { Button } from '@mui/material';

type AnswerType = {
    showAnswer: (show: boolean) => void;
};

export const Answer = ({ showAnswer }: AnswerType) => {
    const nextQuestionHandler = () => {
        showAnswer(false);
    };

    return (
        <div className={styles.answerForm}>
            <div className={styles.question}>
                <div>
                    <strong>Question: </strong>
                    {}
                </div>
                <div className={styles.tries}>
                    Количество попыток ответов на вопрос: <strong>{}</strong>
                </div>
            </div>
            <Button
                className={styles.buttonNext}
                onClick={nextQuestionHandler}
                style={{}}
            >
                Next
            </Button>
        </div>
    );
};
