import { authAPI, LoginParamsType } from '../auth/auth-api';
import { AppThunkType } from '../../app/store';
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer';
import { AxiosError } from 'axios';
import { setDataAC, setIsLoggedInAC } from '../auth/auth-reducer';
import { CardPacksType, packsAPI } from './packs-api';

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
    packsAPI
        .getPacks()
        .then(res => {
            dispatch(getPacksAC(res.data.cardPacks));
            console.log(res);
        })
        .catch((e: AxiosError) => {})
        .finally();
};

// types
export type PacksActionsType = ReturnType<typeof getPacksAC>;

export type PacksDataType = {
    name: string;
    updated: string;
    cardsCount: number;
    user_name: string;

    _id: string;
    user_id: string;

    private: boolean;

    path: string;
    grade: number;
    shots: number;
    deckCover: string;

    type: string;
    rating: number;

    more_id: string;
    __v: number;
};
