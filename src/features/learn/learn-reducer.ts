const initState = {
    isOpen: false,
    AddNewPack: false,
};
type InitialStateType = typeof initState;

export const learnReducer = (
    state = initState,
    action: ModalActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'MODAL/IS_OPEN':
            return { ...state, isOpen: action.value };
        case 'MODAL/ADD_NEW_PACK':
            return { ...state, AddNewPack: action.value };

        default:
            return state;
    }
};

// actions
export const addNewPackModalAC = (value: boolean) =>
    ({ type: 'MODAL/ADD_NEW_PACK', value } as const);
export const isOpenModalAC = (value: boolean) =>
    ({ type: 'MODAL/IS_OPEN', value } as const);

// thunks

// types
export type ModalActionsType =
    | ReturnType<typeof addNewPackModalAC>
    | ReturnType<typeof isOpenModalAC>;