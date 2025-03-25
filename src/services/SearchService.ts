import { axiosInstance, handleError } from ".";
import type { Monster, ApiSearchResponse } from '../models';

const SearchService = {
    monster(searchTerm: string) {
        return axiosInstance.get<ApiSearchResponse<Monster>>(`${import.meta.env.VITE_API_BASE}/monsters/?search=${searchTerm}`)
            .catch(handleError)
    },
    getMonster(slug: string) {
        return axiosInstance.get<Monster>(`${import.meta.env.VITE_API_BASE}/monsters/${slug}`)
            .catch(handleError)
    },
    monsterURL(url: string) {
        return axiosInstance.get<ApiSearchResponse<Monster>>(url)
            .catch(handleError)
    }
};

export default SearchService