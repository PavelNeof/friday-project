import { AppThunkType } from '../../app/store';
import { AxiosError } from 'axios';
import { packsApi } from './packs-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { errorsHandling } from '../../common/utils/error-utils';

const initState = {
    cardPacks: [] as CardPacksType[],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 14,
    minCardsCount: 0,
    maxCardsCount: 6,
    min: 0,
    max: 6,
    isMyPacks: false,
    search: '',
    token: '',
    tokenDeathTime: '',
};

export type PacksResponseType = typeof initState;

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
        case 'PACKS/CHANGE_IS_MY_PACKS':
            return { ...state, isMyPacks: action.isMyPacks };
        case 'PACKS/CHANGE_SEARCH':
            return { ...state, search: action.search };
        case 'PACKS/CHANGE_MIN_MAX_CURRENT':
            return { ...state, ...action.payload };
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
export const changeIsMyPacksAC = (isMyPacks: boolean) =>
    ({ type: 'PACKS/CHANGE_IS_MY_PACKS', isMyPacks } as const);
export const changeSearchAC = (search: string) =>
    ({ type: 'PACKS/CHANGE_SEARCH', search } as const);
export const changeMinMaxCurrentAC = (min: number, max: number) =>
    ({ type: 'PACKS/CHANGE_MIN_MAX_CURRENT', payload: { min, max } } as const);

// thunks
export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const userId = getState().auth.data._id;
        const { page, pageCount, isMyPacks, search, min, max } = getState().packs;
        const user_id = isMyPacks ? userId : '';
        const res = await packsApi.getPacks(page, pageCount, user_id, search, min, max);
        console.log(res);
        dispatch(getPacksAC(res));
    } catch (e) {
        errorsHandling(e as Error | AxiosError, dispatch);
    } finally {
        dispatch(setAppStatusAC('succeeded'));
    }
};

export const addNewPackTC =
    (name: string): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await packsApi.postPack(name);
            dispatch(addNewPackAC(res.newCardsPack));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        } finally {
            dispatch(setAppStatusAC('succeeded'));
        }
    };

export const deletePackTC =
    (id: string): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            await packsApi.deletePack(id);
            dispatch(deletePackAC(id));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        } finally {
            dispatch(setAppStatusAC('succeeded'));
        }
    };

export const updateNamePackTC =
    (id: string, name: string): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'));
        try {
            await packsApi.updatePack(id, name);
            dispatch(updatePackAC(id, name));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        } finally {
            dispatch(setAppStatusAC('succeeded'));
        }
    };

// types
export type PacksActionsType =
    | ReturnType<typeof getPacksAC>
    | ReturnType<typeof addNewPackAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof changePageAC>
    | ReturnType<typeof changePageCountAC>
    | ReturnType<typeof changeIsMyPacksAC>
    | ReturnType<typeof changeSearchAC>
    | ReturnType<typeof changeMinMaxCurrentAC>;

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
