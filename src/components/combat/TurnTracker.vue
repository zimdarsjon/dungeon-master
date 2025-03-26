<script setup lang="ts">
import { useCombatStore } from '@/stores/combat';
import PlayerTracker from '@/components/combat/PlayerTracker.vue';
import { storeToRefs } from 'pinia';

const combatStore = useCombatStore();

const { combatants } = storeToRefs(combatStore);


</script>
<template>
    <div class="flex flex-column justify-content-evenly h-screen fixed container" >
        <template v-for="combatant in combatants">
            <PlayerTracker v-if="combatant.player" :combatant="combatant"/>
        </template>
    </div>
</template>

<style scoped>
.container {
    right: 0;
    top: 0;
}
</style>