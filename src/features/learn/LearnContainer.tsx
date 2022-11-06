import React from 'react';
import styles from './LearnContainer.module.css';
import { BackToPackList } from '../../common/components/BackToPackList/BackToPackList';
import { useAppSelector } from '../../common/hooks/useAppSelector';
import { Learn } from './Learn/Learn';

export const LearnContainer = () => {
    const cards = useAppSelector(state => state.cards.cards);
    const packUserId = useAppSelector(state => state.cards.packUserId);
    const userId = useAppSelector(state => state.auth.data._id);

    return (
        <div className={styles.learn}>
            <BackToPackList />
            {cards.length > 0 ? (
                <Learn />
            ) : packUserId === userId ? (
                <div className={styles.container}>
                    <h1>No cards to learn, please create your Cards!</h1>
                </div>
            ) : (
                <div className={styles.container}>
                    <h1>No cards to learn, please return later...</h1>
                </div>
            )}
        </div>
    );
};
