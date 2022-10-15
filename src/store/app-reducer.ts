const initState: any = {};

export const appReducer = (
    state = initState,
    action: AppReducerActionsType
): any => {
    switch (action.type) {
        // case 'TYPE':
        //     return {...state}
        default:
            return state;
    }
};

export type AppReducerActionsType = any;
