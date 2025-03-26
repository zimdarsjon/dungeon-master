<script lang="ts" setup>
import { Button, InputText, InputNumber, useDialog } from 'primevue';
import { ref, inject } from 'vue';
import type { StagedMonster } from '@/models';
import { useCombatStore } from '@/stores/combat';
import ImageSelection from './ImageSelection.vue';

const combatStore = useCombatStore();
const dialog = useDialog();

const dialogRef : any = inject('dialogRef');

const name = ref<string>('');
const modifier = ref<number>(0);
const count = ref<number>(1);
const image = ref<string>('');

const addToStaging = () => {
    combatStore.addCustomMonsterToStaged({
        id: 0,
        name: name.value,
        image: image.value,
        modifier: modifier.value,
        count: count.value
    } as StagedMonster);
    dialogRef.value.close();
};

const cancel = () => {
    dialogRef.value.close();
};

const selectImage = () => {
    dialog.open(ImageSelection, {
        props: {
            header: 'Select Image',
            modal: true
        },
        onClose: (opt) => {
            if (opt?.data) {
                image.value = opt.data;
            }
        }
    });
};

</script>
<template>
    <div class="pointer">
        <img v-if="image" alt="monster image" :src="image" class="monster-image" @click="selectImage"/>
        <span v-else class="m-5 block flex justify-content-center" @click="selectImage" ><i class="pi pi-image" ></i></span>
    </div>
    <div>
        <div class="flex flex-col gap-2 justify-content-between align-items-center mb-2 mt-4">
            <label for="name">Name: </label>
            <InputText id="name" v-model="name" />
        </div>
        <div class="flex flex-col gap-2 justify-content-between align-items-center mb-2">
            <label for="modifier">Modifier: </label>
            <InputNumber id="modifier" v-model="modifier" />
        </div>
        <div class="flex flex-col gap-2 justify-content-between align-items-center mb-4">
            <label>Count: </label>
            <InputNumber v-model="count" />
        </div>
    </div>
    <div class="flex gap-4">
        <Button label="Cancel" severity="secondary" outlined class="w-full" @click="cancel"/>
        <Button label="Add" class="w-full" @click="addToStaging" />
    </div>
</template>
<style scoped>
img {
    max-height: 40vh;
    object-fit: contain;
    max-width: 20rem;
}
</style>