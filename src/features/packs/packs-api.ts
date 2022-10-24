import { instance } from '../../api/api-config';
import { PacksResponseType } from './Packs-reducer';

export const packsApi = {
    getPacks() {
        return instance.get<PacksResponseType>(`/cards/pack`);
    },
};
