import { AppThunkType } from '../../app/store';
import { AxiosError } from 'axios';
import { packsApi } from './Packs-api';
import { setAppStatusAC } from '../../app/app-reducer';

const initState = {
    data: [] as CardPacksType[],
};
type InitialStateType = typeof initState;

export const packsReducer = (
    state = initState,
    action: PacksActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'PACKS/GET_PACKS':
            return { ...state, data: action.data };

        default:
            return state;
    }
};

// actions
export const getPacksAC = (data: CardPacksType[]) =>
    ({ type: 'PACKS/GET_PACKS', data } as const);

// thunks
export const getPacksTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'));
    packsApi
        .getPacks()
        .then(res => {
            dispatch(getPacksAC(res.data.cardPacks));
            console.log(res);
        })
        .catch((e: AxiosError) => {})
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'));
        });
};

// types
export type PacksActionsType = ReturnType<typeof getPacksAC>;

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
