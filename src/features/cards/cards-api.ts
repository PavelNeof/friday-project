import { instance } from '../../common/api/api-config';
import { CardsResponseType } from './cards-reducer';

export const cardsApi = {
    getCards(
        page: number,
        pageCount: number,
        cardsTotalCount: number,
        cardsPack_id: string | undefined,
        min: number,
        max: number,
    ) {
        return instance
            .get<CardsResponseType>(`/cards/card`, {
                params: {
                    page,
                    pageCount,
                    cardsPack_id,
                    min,
                    max,
                },
            })
            .then(res => res.data);
        // @ts-ignore
        //return instance.get(`/cards/card`, { cardsPack_id });
    },
    postCard(
        cardsPack_id: string | undefined,
        question: string | undefined,
        answer: string | undefined,
    ) {
        return instance
            .post('/cards/card', {
                card: { cardsPack_id, question, answer },
            })
            .then(res => res.data);
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`);
    },
    updateCard(_id: string, question: string, answer: string) {
        return instance.put(`/cards/card`, { card: { _id, question, answer } });
    },
    updateGradeCard(grade: number, card_id: string | undefined) {
        return instance.put(`cards/grade`, { grade, card_id });
    },
};
