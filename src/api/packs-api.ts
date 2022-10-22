import { instance } from './api-config';
import { PacksDataType } from '../features/packs/Packs-reducer';

export const packsAPI = {
    getPacks() {
        // @ts-ignore
        return instance.get<PacksResponseType>(`/cards/pack`);
    },
};

export type PacksResponseType = {
    cardPacks: CardPacksType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
};

export type CardPacksType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
};
