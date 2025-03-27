import { axiosInstance, handleError } from ".";
import type { Open5eMonster, ApiSearchResponse } from '../models';

const Open5eService = {
    monster(searchTerm: string) {
        return axiosInstance.get<ApiSearchResponse<Open5eMonster>>(`${import.meta.env.VITE_API_OPEN}/monsters/?search=${searchTerm}`)
            .catch(handleError)
    },
    getMonster(slug: string) {
        return axiosInstance.get<Open5eMonster>(`${import.meta.env.VITE_API_OPEN}/monsters/${slug}`)
            .catch(handleError)
    },
    monsterURL(url: string) {
        return axiosInstance.get<ApiSearchResponse<Open5eMonster>>(url)
            .catch(handleError)
    }
};

export default Open5eService