import React, { useEffect, useState } from 'react';
import styles from './Learn.module.css';
import ErrorSnackbars from '../../common/components/ErrorSnackbars/ErrorSnackbars';
import { BackToPackList } from '../../common/components/BackToPackList/BackToPackList';
import { CardType, updateGradeCardTC } from '../cards/cards-reducer';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../common/hooks/useAppSelector';
import { NavLink, useParams } from 'react-router-dom';
import { PATH } from '../../common/routing/Route/Route';

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return { sum: newSum, id: newSum < rand ? i : acc.id };
        },
        { sum: 0, id: -1 },
    );
    console.log('test: ', sum, rand, res);
    return cards[res.id + 1];
};

export const Learn = () => {
    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.cards.cards);
    const packUserId = useAppSelector(state => state.cards.packUserId);
    const userId = useAppSelector(state => state.auth.data._id);
    const packName = useAppSelector(state => state.cards.packName);
    const { cardPackIdParam } = useParams();
    const cardPackId = cardPackIdParam?.substring(1, cardPackIdParam?.length);

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
        <div className={styles.learn}>
            <BackToPackList />
            {cards.length > 0 ? (
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
            ) : packUserId === userId ? (
                <div className={styles.container}>
                    <h1>
                        No cards to learn, please create Cards:
                        <NavLink to={`${PATH.ADD_NEW_CARD}/:${cardPackId}`}>
                            AddNewCards
                        </NavLink>
                    </h1>
                </div>
            ) : (
                <div className={styles.container}>
                    <h1>No cards to learn, please return later...</h1>
                </div>
            )}
        </div>
    );
};
