import axios, { AxiosError } from 'axios';
import { setAppErrorAC } from '../../app/app-reducer';
import { AppDispatchType } from '../../app/store';
import { setIsLoggedInAC } from '../../features/auth/auth-reducer';

export function errorsHandling(err: Error | AxiosError, dispatch: AppDispatchType): void {
    if (axios.isAxiosError(err)) {
        const error = err.response?.data
            ? (err.response.data as { error: string }).error
            : err.message;
        dispatch(setAppErrorAC(error));
        if (err.request.status === 401) {
            setIsLoggedInAC(false);
        }
    } else {
        dispatch(setAppErrorAC(`Native error: ${err.message}`));
    }
}
