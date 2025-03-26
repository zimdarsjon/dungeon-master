<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import { Button } from 'primevue';
import Column from 'primevue/column';
import { type Monster, CombatStatus } from '@/models';
import { useCombatStore } from '@/stores/combat';
import { storeToRefs } from 'pinia';

const combatStore = useCombatStore();

const { combatStatus } = storeToRefs(combatStore);

const props = defineProps<{
    monsters: Monster[]
}>();

</script>
<template>
    <DataTable :value="props.monsters" tableStyle="min-width: 50rem" >
        <Column field="name" header="Name">
            <template #body="slotProps">
                <RouterLink :to="`/monsters/${slotProps.data.slug}`">
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
                <Button @click="combatStore.addMonsterToStaged(slotProps.data)">Add To Combat</Button>
            </template>
        </Column>
    </DataTable>
</template>