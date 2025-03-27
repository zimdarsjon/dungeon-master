import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { APISources, type Open5eMonster, type ApiSearchResponse, type APIMonster } from '@/models';
import Open5eService from '@/services/Open5eService.ts';
import APIService from '@/services/APIService';

export const useSearchStore = defineStore('search', () => {

    const source = ref<APISources>(APISources.OpenApi);
    const loading = ref<boolean>(false);
    const searchTerm = ref<string>('');

    const baseApiResults = ref<ApiSearchResponse<APIMonster>>();
    const openApiResults = ref<ApiSearchResponse<Open5eMonster>>();

    const searchBaseAPI = () => {
        loading.value = true;
        APIService.searchMonster(searchTerm.value)
        .then(response => {
            baseApiResults.value = response?.data;
            loading.value = false;
            console.log(baseApiResults.value);
        })
    }

    const searchOpenAPI = () => {
        loading.value = true;
        Open5eService.monster(searchTerm.value)
        .then(response => {
            openApiResults.value = response?.data;
            loading.value = false;
        })
    };
    
    const nextOpenAPI = () => {
        if (openApiResults?.value?.next) {
            loading.value = true;
            Open5eService.monsterURL(openApiResults.value.next)
            .then(response => {
                openApiResults.value = response?.data;
                loading.value = false;
            })
        }
    };
    
    const previousOpenAPI = () => {
        if (openApiResults?.value?.previous) {
            loading.value = true;
            Open5eService.monsterURL(openApiResults.value.previous)
            .then(response => {
                openApiResults.value = response?.data;
                loading.value = false;
            })
        }
    };

    const previous = () => {
        if (source.value == APISources.OpenApi) {
            previousOpenAPI();
        }
    }

    const next = () => {
        if (source.value == APISources.OpenApi) {
            nextOpenAPI();
        }
    };

    const showPrevious = computed(() => {
        if (openApiResults.value?.previous && source.value == APISources.OpenApi) {
            return true;
        };
        return false;
    });

    const showNext = computed(() => {
        if (openApiResults.value?.next && source.value == APISources.OpenApi) {
            return true;
        };
        return false;
    });

    const search = () => {
        if (source.value == APISources.OpenApi) {
            searchOpenAPI();
        } else if (source.value == APISources.DnDApi) {
            searchBaseAPI();
        }
    }

    return {
        loading,
        source,
        showNext,
        showPrevious,
        searchTerm,
        openApiResults,
        baseApiResults,
        search,
        next,
        previous
    }

})