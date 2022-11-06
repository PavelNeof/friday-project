import React from 'react';
import styles from './Answer.module.css';
import { CardType } from '../../cards/cards-reducer';

type AnswerType = {
    card: CardType | undefined;
    setGrade: (value: number) => void;
};

export const Answer = ({ card, setGrade }: AnswerType) => {
    return (
        <div className={styles.answer}>
            <div>
                <strong>Answer: </strong>
                {card?.answer}
            </div>
            <div className={styles.rating}>
                Rate yourself:
                <div className={styles.rate}>
                    <input
                        type="radio"
                        value="1"
                        name="rating"
                        className={styles.radio}
                        onClick={() => setGrade(1)}
                    />
                    Did not know
                </div>
                <div className={styles.rate}>
                    <input
                        type="radio"
                        value="2"
                        name="rating"
                        onClick={() => setGrade(2)}
                    />
                    Forgot
                </div>
                <div className={styles.rate}>
                    <input
                        type="radio"
                        value="3"
                        name="rating"
                        onClick={() => setGrade(3)}
                    />
                    A lot of thought
                </div>
                <div className={styles.rate}>
                    <input
                        type="radio"
                        value="4"
                        name="rating"
                        onClick={() => setGrade(4)}
                    />
                    Confused
                </div>
                <div className={styles.rate}>
                    <input
                        type="radio"
                        value="5"
                        name="rating"
                        onClick={() => setGrade(5)}
                    />
                    Knew the answer
                </div>
            </div>
        </div>
    );
};
