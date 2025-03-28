<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import Open5eService from '../../services/Open5eService.ts';
import type { Open5eMonster } from '../../models/index.ts';
import Actions from '@/components/Actions.vue';
import AbilityScores from '@/components/AbilityScores.vue';
import { useImageHelpers } from '@/composables/image-finder';
import { Card } from 'primevue';
import { Skeleton } from 'primevue';

const route = useRoute();

const { findOpenMonsterImagePath } = useImageHelpers();

const monster = ref<Open5eMonster>();
const loading = ref<boolean>(false);

const imagePath = ref<string>('');

onMounted(() => {
    loading.value = true;
    Open5eService.getMonster(String(route.params.slug))
        .then(response => {
            monster.value = response?.data;
            monster.value ? imagePath.value = findOpenMonsterImagePath(monster.value) : null;
            loading.value = false;
        })
});

</script>
<template>
    <Skeleton width="100%" height="150px" v-if="loading"></Skeleton>
    <div class="flex flex-column w-8 ml-auto mr-auto" v-else>
        <h1>{{ monster?.name }}</h1>
        <img v-if="imagePath" alt="monster-image" :src="imagePath" class="w-full monster-image" />
        <p>{{ monster?.size }} {{ monster?.type }}{{ monster?.alignment ? `, ${monster?.alignment}` : '' }}</p>
        <p><span><b>Challenge Rating: </b></span><span>{{ monster?.cr }}</span></p>
        <p><span><b>Armor Class: </b></span><span>{{ monster?.armor_class }}{{ monster?.armor_desc ? ` (${monster?.armor_desc})` : '' }}</span></p>
        <p><span><b>Hit Points: </b></span><span>{{ monster?.hit_points }} ({{ monster?.hit_dice }})</span></p>
        <p>
            <span><b>Speed: </b></span>
            &nbsp;
            <span v-for="(value, key) in monster?.speed">
                <span>{{ value }} ft. </span>
                <span v-if="key !== 'walk'">{{ key }}</span>
                &nbsp;
            </span>
        </p>
        <Card v-if="monster?.desc" style="overflow: hidden">
            <template #content>
                <div> {{ monster?.desc}}</div>
            </template>
        </Card>
        <AbilityScores v-if="monster" :monster="monster" class="mb-2 mt-5" />
        <div class="text-left mt-5 mb-5">
            <p v-for="action in monster?.special_abilities" ><span><b>{{ action.name }}: </b></span><span>{{ action.desc }}</span></p>
        </div>
        <Actions title="Actions" :actions="monster?.actions" class="mb-4" />
        <Actions title="Legendary Actions" :actions="monster?.legendary_actions" class="mb-4" />
        <div class="text-left" v-if="monster?.environments && monster.environments.length > 0">
            <span><b>Environments: </b></span>
            <span v-for="(environment, index) in monster?.environments">{{ environment }}{{ (monster?.environments.length ?? 0) == index + 1 ? '' : ', '}}</span>
        </div>
    </div>
</template>
<style scoped>
.monster-image {
    max-height: 50vh;
    object-fit: contain;
}
</style>