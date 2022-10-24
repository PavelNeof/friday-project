import { instance } from '../../api/api-config';
import { PacksResponseType } from './Packs-reducer';

export const packsApi = {
    getPacks() {
        return instance.get<PacksResponseType>(`/cards/pack`).then(res => res.data);
    },
    postPack(name: string) {
        return instance
            .post('/cards/pack', { cardsPack: { name } })
            .then(res => res.data);
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`);
    },
    updatePack(_id: string, name: string) {
        return instance.put(`/cards/pack`, { cardsPack: { _id, name } });
    },
};
