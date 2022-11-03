import { AppThunkType } from '../../app/store';
import { AxiosError } from 'axios';
import { cardsApi } from './cards-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { errorsHandling } from '../../common/utils/error-utils';

const initState = {
    cards: [] as CardType[],
    cardsTotalCount: 14,
    maxGrade: 5,
    minGrade: 2,
    packCreated: '',
    packDeckCover: null,
    packName: '',
    packPrivate: false,
    packUpdated: '',
    packUserId: '',
    page: 1,
    pageCount: 5,
    token: '',
    tokenDeathTime: '',
    min: 0,
    max: 10,
    search: '',
};

export type CardsResponseType = typeof initState;

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
        case 'CARDS/UPDATE_GRADE_CARD':
            return {
                ...state,
                cards: state.cards.map(card =>
                    card._id === action.cardId
                        ? {
                              ...card,
                              grade: action.grade,
                          }
                        : card,
                ),
            };
        case 'CARDS/CHANGE_CARD': {
            console.log(action.data._id);
            return {
                ...state,
                cards: state.cards.map(el =>
                    el._id === action.data._id ? { ...action.data } : el,
                ),
            };
        }
        case 'CARDS/CHANGE_CARDS_PAGE':
            return { ...state, page: action.page };
        case 'CARDS/CHANGE_CARDS_PAGE_COUNT':
            return { ...state, pageCount: action.pageSize };
        case 'CARDS/CHANGE_SEARCH':
            return { ...state, search: action.search };
        default:
            return state;
    }
};

// actions
export const getCardsAC = (data: CardsResponseType) =>
    ({ type: 'CARDS/GET_CARDS', data } as const);
export const addNewCardAC = (data: CardType) =>
    ({ type: 'CARDS/ADD_NEW_CARD', data } as const);
export const deleteCardAC = (cardId: string) =>
    ({ type: 'CARDS/DELETE_CARD', cardId } as const);
export const updateCardAC = (cardId: string, newQuestion: string) =>
    ({ type: 'CARDS/UPDATE_CARD', cardId, newQuestion } as const);
export const changeCardAC = (data: CardType) =>
    ({ type: 'CARDS/CHANGE_CARD', data } as const);
export const updateGradeCardAC = (grade: number, cardId: string | undefined) =>
    ({ type: 'CARDS/UPDATE_GRADE_CARD', grade, cardId } as const);
export const changeCardsPageAC = (page: number) =>
    ({ type: 'CARDS/CHANGE_CARDS_PAGE', page } as const);
export const changeCardsPageCountAC = (pageSize: number) =>
    ({ type: 'CARDS/CHANGE_CARDS_PAGE_COUNT', pageSize } as const);
export const changeSearchCardsAC = (search: string) =>
    ({ type: 'CARDS/CHANGE_SEARCH', search } as const);

// thunks
export const getCardsTC =
    (cardPackId: string | undefined): AppThunkType =>
    async (dispatch, getState) => {
        dispatch(setAppStatusAC('loading'));
        try {
            const { page, pageCount, cardsTotalCount, min, max, search } =
                getState().cards;
            const res = await cardsApi.getCards(
                page,
                pageCount,
                cardsTotalCount,
                cardPackId,
                min,
                max,
                search,
            );
            dispatch(getCardsAC(res));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        } finally {
            dispatch(setAppStatusAC('succeeded'));
        }
    };

export const addNewCardTC =
    (
        cardPackId: string | undefined,
        question: string | undefined,
        answer: string | undefined,
    ): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await cardsApi.postCard(cardPackId, question, answer);
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
    (cardId: string, newQuestion: string, newAnswer: string): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await cardsApi.updateCard(cardId, newQuestion, newAnswer);
            dispatch(updateCardAC(cardId, newQuestion));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(changeCardAC(res.data.updatedCard));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        }
    };

export const updateGradeCardTC =
    (grade: number, cardId: string | undefined): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            await cardsApi.updateGradeCard(grade, cardId);
            dispatch(updateGradeCardAC(grade, cardId));
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
    | ReturnType<typeof updateCardAC>
    | ReturnType<typeof updateGradeCardAC>
    | ReturnType<typeof updateCardAC>
    | ReturnType<typeof changeCardAC>
    | ReturnType<typeof changeCardsPageAC>
    | ReturnType<typeof changeSearchCardsAC>
    | ReturnType<typeof changeCardsPageCountAC>;

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
