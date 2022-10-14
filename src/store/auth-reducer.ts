const initState: any = {}

export const authReducer = (state = initState, action: AuthActionsType): any => {
    switch (action.type) {
        // case 'TYPE':
        //     return {...state}
        default:
            return state
    }
}

export type AuthActionsType = any