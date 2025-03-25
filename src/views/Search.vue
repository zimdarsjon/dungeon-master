<script lang="ts" setup>
import { InputText, Button } from 'primevue';
import { Form } from '@primevue/forms';
import { ref } from 'vue';
import SearchService from '../services/SearchService.ts';
import MonsterTable from '../components/search/MonsterTable.vue';
import type { Monster, ApiSearchResponse } from '../models';

const searchTerm = ref<string>('');
const loading = ref<boolean>(false);

const searchResponse = ref<ApiSearchResponse<Monster>>();


const search = () => {
    loading.value = true;
    SearchService.monster(searchTerm.value)
    .then(response => {
        searchResponse.value = response?.data;
        loading.value = false;
    })
};

const next = () => {
    if (searchResponse?.value?.next) {
        loading.value = true;
        SearchService.monsterURL(searchResponse.value.next)
        .then(response => {
            searchResponse.value = response?.data;
            loading.value = false;
        })
    }
};

const previous = () => {
    if (searchResponse?.value?.previous) {
        loading.value = true;
        SearchService.monsterURL(searchResponse.value.previous)
        .then(response => {
            searchResponse.value = response?.data;
            loading.value = false;
        })
    }
};

</script>
<template>
    <h1>Search</h1>
    <div>
        <Form @submit="search" class="flex justify-content-between mb-4">
            <div class="previous-wrapper w-4rem">
                <Button v-if="searchResponse?.previous" @click="previous">Previous</Button>
            </div>
            <div class="search-wrapper">
                <InputText v-model="searchTerm"/>
                <Button icon="pi pi-search" type="submit" :loading="loading" label="Search" />
            </div>
            <div class="next-wrapper w-4rem">
                <Button v-if="searchResponse?.next" @click="next">Next</Button>
            </div>
        </Form>
    </div>
    <div>
        <MonsterTable :monsters="searchResponse?.results ?? []" />
    </div>
</template>