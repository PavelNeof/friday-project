import { CardPacksType, packsApi } from '../packs/Packs-api';
import { PacksActionsType } from '../packs/Packs-reducer';
import { AppThunkType } from '../../app/store';
import { AxiosError } from 'axios';
import { cardsApi } from './Cards-api';

const initState = {};
type InitialStateType = typeof initState;

export const cardsReducer = (
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
        cardsApi
            .getCards(id)
            .then(res => {
                // dispatch(getCardsAC(res.data));
                console.log(res);
            })
            .catch((e: AxiosError) => {})
            .finally();
    };

// types
export type CardsActionsType = ReturnType<typeof getCardsAC>;
