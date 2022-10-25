import { AppThunkType } from '../../app/store';
import { AxiosError } from 'axios';
import { cardsApi } from './cards-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { errorsHandling } from '../../common/utils/error-utils';

const initState: CardsResponseType = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 5,
    minGrade: 2,
    packCreated: '',
    packDeckCover: null,
    packName: '',
    packPrivate: false,
    packUpdated: '',
    packUserId: '',
    page: 1,
    pageCount: 4,
    token: '',
    tokenDeathTime: '',
};

export const cardsReducer = (
    state = initState,
    action: CardsActionsType,
): CardsResponseType => {
    switch (action.type) {
        case 'CARDS/GET_CARDS':
            return { ...state, ...action.data };
        case 'CARDS/ADD_NEW_CARD':
            return { ...state, cards: [action.data, ...state.cards] };
        case 'CARDS/DELETE_CARD':
            return {
                ...state,
                cards: state.cards.filter(card => card._id !== action.cardId),
            };
        case 'CARDS/UPDATE_CARD':
            return {
                ...state,
                cards: state.cards.map(card =>
                    card._id === action.cardId
                        ? {
                              ...card,
                              question: action.newQuestion,
                          }
                        : card,
                ),
            };
        default:
            return state;
    }
};

// actions
export const getCardsAC = (data: CardsResponseType[]) =>
    ({ type: 'CARDS/GET_CARDS', data } as const);
export const addNewCardAC = (data: CardType) =>
    ({ type: 'CARDS/ADD_NEW_CARD', data } as const);
export const deleteCardAC = (cardId: string) =>
    ({ type: 'CARDS/DELETE_CARD', cardId } as const);
export const updateCardAC = (cardId: string, newQuestion: string) =>
    ({ type: 'CARDS/UPDATE_CARD', cardId, newQuestion } as const);

// thunks
export const getCardsTC =
    (cardPackId: string | undefined): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await cardsApi.getCards(cardPackId);
            dispatch(getCardsAC(res));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        }
    };

export const addNewCardTC =
    (cardPackId: string | undefined): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await cardsApi.postCard(cardPackId);
            console.log(res);
            dispatch(addNewCardAC(res.newCard));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        }
    };

export const deleteCardTC =
    (cardId: string): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            await cardsApi.deleteCard(cardId);
            dispatch(deleteCardAC(cardId));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        }
    };

export const updateCardTC =
    (cardId: string, newQuestion: string): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            await cardsApi.updateCard(cardId, newQuestion);
            dispatch(updateCardAC(cardId, newQuestion));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        }
    };

// types
export type CardsActionsType =
    | ReturnType<typeof getCardsAC>
    | ReturnType<typeof addNewCardAC>
    | ReturnType<typeof deleteCardAC>
    | ReturnType<typeof updateCardAC>;

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
    tokenDeathTime: string;
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
