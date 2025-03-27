<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import APIService from '@/services/APIService.ts';
import type { APIMonster } from '../../models/index.ts';
import Actions from '@/components/Actions.vue';
import AbilityScores from '@/components/AbilityScores.vue';
import { Skeleton } from 'primevue';

const route = useRoute();

const monster = ref<APIMonster>();
const loading = ref<boolean>(false);

const imagePath = ref<string>('');

onMounted(() => {
    loading.value = true;
    APIService.getMonster(String(route.params.index))
        .then(response => {
            monster.value = response?.data;
            loading.value = false;
        })
})

</script>
<template>
    <Skeleton width="100%" height="150px" v-if="loading"></Skeleton>
    <div class="flex flex-column w-8 ml-auto mr-auto" v-else>
        <h1>{{ monster?.name }}</h1>
        <img v-if="imagePath" alt="monster-image" :src="imagePath" class="w-full monster-image" />
        <img v-if="monster?.image" alt="monster-image" :src="`https://www.dnd5eapi.co${monster.image}`" class="w-full monster-image" />
        <p>{{ monster?.size }} {{ monster?.type }}{{ monster?.alignment ? `, ${monster?.alignment}` : '' }}</p>
        <p><span><b>Challenge Rating: </b></span><span>{{ monster?.challenge_rating }}</span></p>
        <p><span><b>Armor Class: </b></span><span>{{ monster?.armor_class[0]?.value ?? '' }}</span></p>
        <p><span><b>Hit Points: </b></span><span>{{ monster?.hit_points }} ({{ monster?.hit_dice }})</span></p>
        <p>
            <span><b>Speed: </b></span>
            &nbsp;
            <span v-for="(value, key) in monster?.speed">
                <span>{{ value }}</span>
                <span>{{ ` ${key}` }}</span>
                &nbsp;
            </span>
        </p>
        <!-- <Card v-if="monster?.desc" style="overflow: hidden">
            <template #content>
                <div> {{ monster?.desc}}</div>
            </template>
        </Card> -->
        <AbilityScores v-if="monster" :monster="monster" class="mb-2 mt-5" />
        <div class="text-left mt-5 mb-5">
            <p v-for="action in monster?.special_abilities" ><span><b>{{ action.name }}: </b></span><span>{{ action.desc }}</span></p>
        </div>
        <Actions title="Actions" :actions="monster?.actions" class="mb-4" />
        <Actions title="Legendary Actions" :actions="monster?.legendary_actions" class="mb-4" />
    </div>
</template>
<style scoped>
.monster-image {
    max-height: 50vh;
    object-fit: contain;
}
</style>