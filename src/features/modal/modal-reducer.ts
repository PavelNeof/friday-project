
const initState = {
    AddNewPack: false
}
type InitialStateType = typeof initState;

export const modalReducer = (
    state = initState,
    action: ModalActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'MODAL/ADD_NEW_PACK':
            return { ...state, AddNewPack: action.value };

        default:
            return state;
    }
};

// actions
export const addNewPackModalAC = (value: boolean) =>
    ({ type: 'MODAL/ADD_NEW_PACK', value } as const);


// thunks


// types
export type ModalActionsType =
    | ReturnType<typeof addNewPackModalAC>
