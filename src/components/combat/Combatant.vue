<script setup lang="ts">
import { Button, Card, InputNumber } from 'primevue';
import type { Combatant } from '@/models';
import { useCombatStore } from '@/stores/combat';

const combatStore = useCombatStore();

const props = defineProps<{
    combatant: Combatant,
    active?: boolean
}>();

const emit = defineEmits<{
  (e: 'rightClick', event: any, id: number): void
}>()

</script>
<template>
    <Card style="width: 23rem; overflow: hidden; padding: 1em; justify-content: space-between;" class="card" @contextmenu="e => emit('rightClick', e, props.combatant.id ?? 0)">
        <template #header>
            <img v-if="props.combatant.image" :alt="`${combatant.name} image`" :src="props.combatant.image" class="w-full combatant-image" />
            <span v-else class="m-5 block"><i class="pi pi-image"></i></span>
        </template>
        <template #title>
            <span>{{ props.combatant.name }}</span>
        </template>
        <!-- <template #content>
            <div>
                <label>Initiative: </label>
                <InputNumber v-model="props.combatant.initiative" />
            </div>
        </template> -->
        <!-- <template #footer>
            <div class="flex gap-4 mt-1">
                <Button label="Remove" severity="secondary" outlined class="w-full" @click="combatStore.removeCombatantFromCombat(props.combatant)"/>
            </div>#232325
        </template> -->
    </Card>
</template>
<style scoped>
.combatant-image {
    max-height: 40vh;
    height: 100%;
    object-fit: contain;
}
.card {
    border: 1px solid;
    border-color: var(--p-button-outlined-secondary-border-color);
}
</style>