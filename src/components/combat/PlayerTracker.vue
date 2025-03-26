<script setup lang="ts">
import type { Combatant } from '@/models';
import { useCombatStore } from '@/stores/combat';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const combatStore = useCombatStore();

const { combatantIndex, combatants } = storeToRefs(combatStore);

const props = defineProps<{
    combatant: Combatant
}>();

const turns = computed(() => {
    // Find the index of the target enemy
    const targetIndex = combatants.value.findIndex((combatant) => combatant.id === props.combatant.id);

    // If the enemy with the given ID is not found, return -1 (invalid id)
    if (targetIndex === -1) {
        return -1;
    }

    // If the target index is the same as the current index, return 0
    if (targetIndex === combatantIndex.value) {
        return 0;
    }

    // If the target index is after the current index in the array
    if (targetIndex > combatantIndex.value) {
        return targetIndex - combatantIndex.value;
    }

    // If the target index is before the current index, loop around
    return combatants.value.length - combatantIndex.value + targetIndex;
})


</script>
<template>
    <div class="relative">
        <img :alt="`${combatant.name} image`" :src="combatant.image" class="w-full combatant-image" />
        <div class="absolute top-0 right-0 bottom-0 left-0 w-full flex justify-content-center">
            <div class="flex align-items-center">
                <div class="turn-container">
                    <span class="turns">{{ turns }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.combatant-image {
    max-height: 10vh;
    height: 100%;
    object-fit: static;
}

.container {
    right: 0;
    top: 0;
}

.turn-container {
    background-color: rgba(97, 97, 97, 0.8);
    padding: 1rem;
    border-radius: 100%;
    display: flex;
    width: 4rem;
    height: 4rem;
    align-items: center;
    justify-content: center;
}

.turns {
    font-size: 2rem;
}

img {
    border-bottom-left-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
}
</style>