import { axiosInstance, handleError } from ".";
import type { APIMonster, ApiSearchResponse } from '../models';

const APIService = {
    getMonster(index: string) {
        return axiosInstance.get<APIMonster>(`${import.meta.env.VITE_API_BASE}/monsters/${index}`)
            .catch(handleError)
    },
    searchMonster(name: string) {
        return axiosInstance.get<ApiSearchResponse<APIMonster>>(`${import.meta.env.VITE_API_BASE}/monsters/?name=${name}`)
            .catch(handleError)
    },
};

export default APIService