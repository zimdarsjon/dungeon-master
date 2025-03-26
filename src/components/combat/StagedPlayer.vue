<script setup lang="ts">
import { Button, Card, InputNumber } from 'primevue';
import type { StagedPlayer } from '@/models';
import { useCombatStore } from '@/stores/combat';

const combatStore = useCombatStore();

const props = defineProps<{
    player: StagedPlayer
}>();


</script>
<template>
    <Card style="width: 25rem; overflow: hidden" class="card">
        <template #header>
            <img :alt="`${player.name} image`" :src="props.player.image" class="w-full monster-image" />
        </template>
        <template #title>
            <span>{{ props.player.name }}</span>
        </template>
        <template #content>
            <div class="flex flex-col gap-2 justify-content-between align-items-center mb-1">
                <label>Initiative: </label>
                <InputNumber v-model="props.player.initiative" />
            </div>
        </template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <Button label="Remove" severity="secondary" outlined class="w-full" @click="combatStore.removePlayerFromStaged(props.player)"/>
            </div>
        </template>
    </Card>
</template>
<style scoped>
.monster-image {
    max-height: 40vh;
    object-fit: contain;
}
.card {
    border: 1px solid;
    border-color: var(--p-button-outlined-secondary-border-color);
}
</style>