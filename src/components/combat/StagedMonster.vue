<script setup lang="ts">
import { Button, Card, InputNumber, InputText, useDialog } from 'primevue';
import type { StagedMonster } from '@/models';
import { useCombatStore } from '@/stores/combat';
import { ref, onMounted } from 'vue';
import ImageSelection from '@/components/modals/ImageSelection.vue';
import { nextTick } from 'vue';

const combatStore = useCombatStore();

const editMode = ref<boolean>(false);
const nameInput = ref<any>();

const dialog = useDialog();

const localMonster = ref<StagedMonster>({} as StagedMonster);

const imageView = ref<1 | 2>(1);

const props = defineProps<{
    monster: StagedMonster
}>();

onMounted(() => localMonster.value = { ...props.monster });

const cancelChanges = () => {
    localMonster.value = { ...props.monster };
    editMode.value = false;
};

const saveChanges = () => {
  Object.keys(localMonster.value).forEach(key => {
    (props.monster as any)[key] = (localMonster.value as any)[key];
  });
  editMode.value = false;
};

const edit = () => {
    editMode.value = true;
    nextTick(() => {
        nameInput.value.$el.focus();
    });
};

const selectImage = () => {
    if (editMode.value) {
        dialog.open(ImageSelection, {
        props: {
            header: 'Select Image',
            modal: true
        },
        onClose: (opt) => {
            if (opt?.data) {
                if (imageView.value == 1) {
                    localMonster.value.image = opt.data;
                } else {
                    localMonster.value.image2 = opt.data;
                }
            }
        }
    });
    }
};

</script>
<template>
    <Card style="width: 23rem; overflow: hidden" class="card">
        <template #header>
            <div :class="{ 'cursor-pointer': editMode}" @click="selectImage">
                <img v-if="props.monster.image && !editMode && imageView == 1" alt="user header" :src="props.monster.image" class="w-full monster-image" />
                <img v-else-if="props.monster.image2 && !editMode && imageView == 2" alt="user header" :src="props.monster.image2" class="w-full monster-image" />
                <img v-else-if="editMode && localMonster.image && imageView == 1" alt="user header" :src="localMonster.image" class="w-full monster-image" />
                <img v-else-if="editMode && localMonster.image2 && imageView == 2" alt="user header" :src="localMonster.image2" class="w-full monster-image" />
                <span v-else class="m-5 block" ><i class="pi pi-image" ></i></span>
            </div>
            <div class="flex w-full justify-content-center mt-2 gap-2">
                <Button :severity="imageView == 2 ? 'secondary' : ''" @click="imageView = 1">1</Button>
                <Button :severity="imageView == 1 ? 'secondary' : ''" @click="imageView = 2">2</Button>
            </div>
        </template>
        <template #title>
            <div v-if="editMode" class="flex flex-col gap-2 justify-content-between align-items-center mb-1">
                <label>Name: </label>
                <InputText v-model="localMonster.name" ref="nameInput" autofocus/>
            </div>
            <span v-else>{{ props.monster.name ?? '' }}</span>
        </template>
        <template #content>
            <div v-if="editMode" class="flex flex-col gap-2 justify-content-between align-items-center mb-2">
                <label>Modifier: </label>
                <InputNumber v-model="localMonster.modifier" />
            </div>
            <p class="m-0" v-else>
                <label>Modifier: </label>
                <span>{{ props.monster.modifier }}</span>
            </p>
            <div v-if="editMode" class="flex flex-col gap-2 justify-content-between align-items-center mb-2">
                <label>Count: </label>
                <InputNumber v-model="localMonster.count" />
            </div>
            <p class="m-0" v-if="props.monster.count && props.monster.count > 1 && !editMode">
                <label>Count: </label>
                <span>{{ props.monster.count }}</span>
            </p>
        </template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <template v-if="editMode">
                    <Button label="Cancel" severity="secondary" outlined class="w-full" @click="cancelChanges"/>
                    <Button label="Save" class="w-full" @click="saveChanges" />
                </template>
                <template v-else>
                    <Button label="Remove" severity="secondary" outlined class="w-full" @click="combatStore.removeMonsterFromStaged(props.monster)"/>
                    <Button label="Duplicate" severity="secondary" outlined class="w-full" @click="combatStore.duplicateMonsterFromStaged(props.monster)"/>
                    <Button label="Edit" class="w-full" @click="edit" />
                </template>
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