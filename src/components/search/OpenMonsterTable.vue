<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import { Button } from 'primevue';
import Column from 'primevue/column';
import { CombatStatus, type Open5eMonster } from '@/models';
import { useCombatStore } from '@/stores/combat';
import { useSearchStore } from '@/stores/search';
import { storeToRefs } from 'pinia';
import { useTypeConversionHelpers } from '@/composables/type-conversion.ts';

const { convertOpenMonsterToStagedMonster } = useTypeConversionHelpers();

const combatStore = useCombatStore();
const searchStore = useSearchStore();

const { combatStatus } = storeToRefs(combatStore);
const { openApiResults } = storeToRefs(searchStore);

const addToStaged = (monster: Open5eMonster) => {
    const stagedMonster = convertOpenMonsterToStagedMonster(monster);
    combatStore.addMonsterToStaged(stagedMonster);
}


</script>
<template>
    <DataTable :value="openApiResults?.results ?? []" tableStyle="min-width: 50rem" >
        <Column field="name" header="Name">
            <template #body="slotProps">
                <RouterLink :to="`/monsters/open/${slotProps.data.slug}`">
                    <span>{{ slotProps.data.name }}</span>
                </RouterLink>
            </template>
        </Column>
        <Column field="cr" header="CR" sortable></Column>
        <Column field="type" header="Type" sortable></Column>
        <Column field="size" header="Size"></Column>
        <Column field="document__title" header="Source"></Column>
        <Column v-if="combatStatus == CombatStatus.Staging">
            <template #body="slotProps">
                <Button @click="addToStaged(slotProps.data)">Add To Combat</Button>
            </template>
        </Column>
    </DataTable>
</template>