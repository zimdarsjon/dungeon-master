<script lang="ts" setup>
import { Button, InputText, InputNumber, useDialog } from 'primevue';
import { ref, inject } from 'vue';
import type { StagedMonster } from '@/models';
import { useCombatStore } from '@/stores/combat';
import ImageSelection from './ImageSelection.vue';

const combatStore = useCombatStore();
const dialog = useDialog();

const dialogRef: any = inject('dialogRef');

const name = ref<string>('');
const modifier = ref<number>(0);
const count = ref<number>(1);
const image = ref<string>('');
const image2 = ref<string>('');
const imageView = ref<1 | 2>(1);

const addToStaging = () => {
    combatStore.addCustomMonsterToStaged({
        id: 0,
        name: name.value,
        image: image.value,
        image2: image2.value,
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
                if (imageView.value == 1) {
                    image.value = opt.data;
                } else {
                    image2.value = opt.data;
                }
            }
        }
    });
};

</script>
<template>
    <div class="pointer">
        <div class="flex flex-column">
            <img v-if="image && imageView == 1" alt="monster image" :src="image" class="monster-image"
                @click="selectImage" />
            <img v-else-if="image2 && imageView == 2" alt="monster image" :src="image2" class="monster-image"
                @click="selectImage" />
            <span v-else class="m-5 block flex justify-content-center" @click="selectImage"><i
                    class="pi pi-image"></i></span>
            <div class="flex w-full justify-content-center mt-2 gap-2">
                <Button :severity="imageView == 2 ? 'secondary' : ''" @click="imageView = 1">1</Button>
                <Button :severity="imageView == 1 ? 'secondary' : ''" @click="imageView = 2">2</Button>
            </div>
        </div>
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
        <Button label="Cancel" severity="secondary" outlined class="w-full" @click="cancel" />
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