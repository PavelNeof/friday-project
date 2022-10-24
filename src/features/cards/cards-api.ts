import { instance } from '../../api/api-config';

export const ardsApi = {
    getCards(cardsPack_id: string | undefined) {
        return instance.get(`/cards/card?cardsPack_id=${cardsPack_id}`);
        // @ts-ignore
        //return instance.get(`/cards/card`, { cardsPack_id });
    },
};