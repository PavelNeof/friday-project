import { instance } from '../../api/api-config';

export const cardsApi = {
    getCards(cardsPack_id: string | undefined) {
        return instance
            .get(`/cards/card?cardsPack_id=${cardsPack_id}`)
            .then(res => res.data);
        // @ts-ignore
        //return instance.get(`/cards/card`, { cardsPack_id });
    },
    postCard(cardsPack_id: string | undefined, question: string | undefined, answer:string | undefined) {
        return instance
            .post('/cards/card', { card: { cardsPack_id, question, answer } })
            .then(res => res.data);
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`);
    },
    updateCard(_id: string, question: string, answer: string) {
        return instance.put(`/cards/card`, { card: { _id, question, answer } });
    },
};
