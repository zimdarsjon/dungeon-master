<script setup lang="ts">
import { Card } from 'primevue';
import type { Combatant } from '@/models';

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