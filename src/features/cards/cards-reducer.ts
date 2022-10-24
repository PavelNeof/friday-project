import { AppThunkType } from '../../app/store';
import { AxiosError } from 'axios';
import { ardsApi } from './cards-api';
import { setAppStatusAC } from '../../app/app-reducer';

const initState = {
    data: {} as CardsResponseType,
};
type InitialStateType = typeof initState;

export const ardsReducer = (
    state = initState,
    action: CardsActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'CARDS/GET_CARDS':
            return { ...state, data: action.data };

        default:
            return state;
    }
};

// actions
export const getCardsAC = (data: any) => ({ type: 'CARDS/GET_CARDS', data } as const);

// thunks
export const getCardsTC =
    (id: string | undefined): AppThunkType =>
    dispatch => {
        dispatch(setAppStatusAC('loading'));
        ardsApi
            .getCards(id)
            .then(res => {
                dispatch(getCardsAC(res.data));
                console.log(res);
            })
            .catch((e: AxiosError) => {})
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'));
            });
    };

// types
export type CardsActionsType = ReturnType<typeof getCardsAC>;

export type CardsResponseType = {
    cards: CardType[];
    cardsTotalCount: number;
    maxGrade: number;
    minGrade: number;
    packCreated: string;
    packDeckCover: null;
    packName: string;
    packPrivate: boolean;
    packUpdated: string;
    packUserId: string;
    page: number;
    pageCount: number;
    token: string;
    tokenDeathTime: number;
};

export type CardType = {
    answer: string;
    answerImg: string;
    answerVideo: string;
    cardsPack_id: string;
    comments: string;
    created: string;
    grade: number;
    more_id: string;
    question: string;
    questionImg: string;
    questionVideo: string;
    rating: number;
    shots: number;
    type: string;
    updated: string;
    user_id: string;
    __v: number;
    _id: string;
};
