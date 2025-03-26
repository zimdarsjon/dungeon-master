<script lang="ts" setup>
import { onMounted, inject, ref } from 'vue';
import { useImageHelpers } from '@/composables/image-finder';
import { Button } from 'primevue';

const dialogRef : any = inject('dialogRef');

const { getAllImages } = useImageHelpers();

const imagePaths = ref<string[]>([]);

const selectedPath = ref<string>('');

onMounted(() => {
    imagePaths.value = getAllImages();
});

const save = () => {
    dialogRef.value.close(selectedPath.value);
};

const cancel = () => {
    dialogRef.value.close();
};

</script>
<template>
    <div class="flex flex-wrap gap-3 justify-content-center">
        <img v-for="path in imagePaths" alt="user header" :src="path" class="monster-image" @click="selectedPath = path" :class="{ selected: selectedPath == path}"/>
    </div>
    <div class="flex gap-4 mt-4">
        <Button label="Cancel" severity="secondary" outlined class="w-full" @click="cancel"/>
        <Button label="Select" class="w-full" @click="save" />
    </div>
</template>
<style scoped>
img {
    max-width: 25%;
    max-height: 30vh;
    object-fit: contain;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 2rem;
}
.selected {
    border: 5px solid #34d399;
}
</style>