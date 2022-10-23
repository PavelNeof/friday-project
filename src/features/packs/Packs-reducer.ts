import { AppThunkType } from '../../app/store';
import { AxiosError } from 'axios';
import { CardPacksType, packsApi } from './Packs-api';

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
    packsApi
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
