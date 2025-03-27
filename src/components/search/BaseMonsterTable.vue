<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import { Button } from 'primevue';
import Column from 'primevue/column';
import { CombatStatus, type APIMonster } from '@/models';
import { useCombatStore } from '@/stores/combat';
import { useSearchStore } from '@/stores/search';
import { storeToRefs } from 'pinia';
import { useTypeConversionHelpers } from '@/composables/type-conversion.ts';

const { convertBaseMonsterToStagedMonster } = useTypeConversionHelpers();

const combatStore = useCombatStore();
const searchStore = useSearchStore();

const { combatStatus } = storeToRefs(combatStore);
const { baseApiResults } = storeToRefs(searchStore);

const addToStaged = async (monsterIndex: string) => {
    const stagedMonster = await convertBaseMonsterToStagedMonster(monsterIndex);
    if (stagedMonster) {
        combatStore.addMonsterToStaged(stagedMonster);
    }
}

</script>
<template>
    <DataTable :value="baseApiResults?.results ?? []" tableStyle="min-width: 50rem" >
        <Column field="name" header="Name">
            <template #body="slotProps">
                <RouterLink :to="`/monsters/base/${slotProps.data.index}`">
                    <span>{{ slotProps.data.name }}</span>
                </RouterLink>
            </template>
        </Column>
        <Column v-if="combatStatus == CombatStatus.Staging">
            <template #body="slotProps">
                <Button @click="addToStaged(slotProps.data.index)">Add To Combat</Button>
            </template>
        </Column>
    </DataTable>
</template>