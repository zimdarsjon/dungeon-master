<script lang="ts" setup>
import { onMounted, inject, ref, watch } from 'vue';
import { useImageHelpers } from '@/composables/image-finder';
import { Button, InputText } from 'primevue';

const dialogRef : any = inject('dialogRef');

const { getAllImages } = useImageHelpers();

const imagePaths = ref<string[]>([]);

const selectedPath = ref<string>('');
const customPath = ref<string>('');

onMounted(() => {
    imagePaths.value = getAllImages();
});

const save = () => {
    if (customPath.value) {
        dialogRef.value.close(customPath.value);
    } else {
        dialogRef.value.close(selectedPath.value);
    }
};

const cancel = () => {
    dialogRef.value.close();
};

watch(customPath, () => {
    if (customPath.value) {
        selectedPath.value = '';
    }
})

</script>
<template>
    <div class="flex flex-wrap gap-3 justify-content-center">
        <img v-for="path in imagePaths" alt="user header" :src="path" class="monster-image" @click="() => {
            selectedPath = path;
            customPath = '';
            }" :class="{ selected: selectedPath == path}"/>
    </div>
    <div class="mt-4">
        <InputText v-model="customPath" class="w-full"/>
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