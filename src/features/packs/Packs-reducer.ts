import { AppThunkType } from '../../app/store';
import { AxiosError } from 'axios';
import { packsApi } from './packs-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { errorsHandling } from '../../common/utils/error-utils';

const initState: PacksResponseType = {
    cardPacks: [],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 14,
    minCardsCount: 110,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: '',
};

export const packsReducer = (
    state = initState,
    action: PacksActionsType,
): PacksResponseType => {
    switch (action.type) {
        case 'PACKS/GET_PACKS':
            return { ...state, ...action.data };
        case 'PACKS/ADD_NEW_PACK':
            return {
                ...state,
                cardPacks: [action.data, ...state.cardPacks],
            };
        case 'PACKS/DELETE_PACK':
            return {
                ...state,
                cardPacks: state.cardPacks.filter(pack => pack._id !== action.packId),
            };
        case 'PACKS/UPDATE_PACK':
            return {
                ...state,
                cardPacks: state.cardPacks.map(pack =>
                    pack._id === action.packId
                        ? {
                              ...pack,
                              name: action.newName,
                          }
                        : pack,
                ),
            };
        case 'PACKS/CHANGE_PAGE':
            return { ...state, page: action.page };
        case 'PACKS/CHANGE_PAGE_COUNT':
            return { ...state, pageCount: action.pageSize };
        default:
            return state;
    }
};

// actions
export const getPacksAC = (data: PacksResponseType) =>
    ({ type: 'PACKS/GET_PACKS', data } as const);
export const addNewPackAC = (data: CardPacksType) =>
    ({ type: 'PACKS/ADD_NEW_PACK', data } as const);
export const deletePackAC = (packId: string) =>
    ({ type: 'PACKS/DELETE_PACK', packId } as const);
export const updatePackAC = (packId: string, newName: string) =>
    ({ type: 'PACKS/UPDATE_PACK', packId, newName } as const);
export const changePageAC = (page: number) =>
    ({ type: 'PACKS/CHANGE_PAGE', page } as const);
export const changePageCountAC = (pageSize: number) =>
    ({ type: 'PACKS/CHANGE_PAGE_COUNT', pageSize } as const);

// thunks
export const getPacksTC =
    (page: number, pageCount: number): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await packsApi.getPacks(page, pageCount);
            dispatch(getPacksAC(res));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        }
    };

export const addNewPackTC =
    (name: string): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await packsApi.postPack(name);
            dispatch(addNewPackAC(res.newCardsPack));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        }
    };

export const deletePackTC =
    (id: string): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            await packsApi.deletePack(id);
            dispatch(deletePackAC(id));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        }
    };

export const updateNamePackTC =
    (id: string, name: string): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            await packsApi.updatePack(id, name);
            dispatch(updatePackAC(id, name));
            dispatch(setAppStatusAC('succeeded'));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        }
    };

// types
export type PacksActionsType =
    | ReturnType<typeof getPacksAC>
    | ReturnType<typeof addNewPackAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof changePageAC>
    | ReturnType<typeof changePageCountAC>;

export type PacksResponseType = {
    cardPacks: CardPacksType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: string;
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
