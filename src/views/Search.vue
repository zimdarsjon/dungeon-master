<script lang="ts" setup>
import { InputText, Button, RadioButton } from 'primevue';
import { Form } from '@primevue/forms';
import OpenMonsterTable from '../components/search/OpenMonsterTable.vue';
import BaseMonsterTable from '@/components/search/BaseMonsterTable.vue';
import { useSearchStore } from '@/stores/search';
import { storeToRefs } from 'pinia';
import { APISources } from '@/models';

const searchStore = useSearchStore();

const { loading, searchTerm, showNext, showPrevious, source } = storeToRefs(searchStore);

</script>
<template>
    <h1>Search</h1>
    <div>
        <Form @submit="searchStore.search">
            <div  class="flex flex-wrap gap-4 justify-content-center mb-4">
                <div class="flex items-center gap-2">
                    <RadioButton v-model="source" inputId="open-api" name="Open API" :value="APISources.OpenApi" />
                    <label for="open-api">Open API</label>
                </div>
                <div class="flex items-center gap-2">
                    <RadioButton v-model="source" inputId="5e-api" name="5e API" :value="APISources.DnDApi" />
                    <label for="5e-api">5e API</label>
                </div>
            </div>
            <div class="flex justify-content-between mb-4">
                <div class="previous-wrapper w-4rem">
                    <Button v-if="showPrevious" @click="searchStore.previous">Previous</Button>
                </div>
                <div class="search-wrapper">
                    <InputText v-model="searchTerm" />
                    <Button icon="pi pi-search" type="submit" :loading="loading" label="Search" />
                </div>
                <div class="next-wrapper w-4rem">
                    <Button v-if="showNext" @click="searchStore.next">Next</Button>
                </div>
            </div>
        </Form>
    </div>
    <div>
        <OpenMonsterTable v-if="source == APISources.OpenApi" />
        <BaseMonsterTable v-if="source == APISources.DnDApi"  />
    </div>
</template>