<script lang="ts" setup>
import { Button, Tabs, TabList, Tab, TabPanels, TabPanel, ContextMenu, useDialog } from 'primevue';
import { useCombatStore } from '@/stores/combat';
import { CombatStatus } from '@/models';
import { storeToRefs } from 'pinia';
import StagedMonster from '@/components/combat/StagedMonster.vue';
import StagedPlayer from '@/components/combat/StagedPlayer.vue';
import Combatant from '@/components/combat/Combatant.vue';
import TurnTracker from '@/components/combat/TurnTracker.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import AddStagedMonster from '@/components/modals/AddStagedMonster.vue';

const combatStore = useCombatStore();
const dialog = useDialog();


const { combatStatus, stagedMonsters, stagedPlayers, combatantsByTurn } = storeToRefs(combatStore);

const startCombat = () => {
    combatStore.startCombat();
};

const touchedCombatantID = ref<number>(0);

const menu = ref();
const rightClickItems = ref([
    // { label: 'Edit', icon: 'pi pi-copy', command: () => combatStore.editEntity(rightClickCombatantID.value)},
    { label: 'Delete', icon: 'pi pi-file-edit', command: () => combatStore.removeCombatantByID(touchedCombatantID.value)}
]);


const handleRightClick = (event: any, id: number) => {
    touchedCombatantID.value = id;
    menu.value.show(event);
};

const addMonsterToStaging = () => {
    dialog.open(AddStagedMonster, {
        props: {
            header: 'Add Monster',
            modal: true
        }
    });
};


onMounted(() => window.addEventListener('keydown', combatStore.handleKeyBoard));
onUnmounted(() => window.removeEventListener('keydown', combatStore.handleKeyBoard));

</script>
<template>
    <ContextMenu ref="menu" :model="rightClickItems" />
    <div v-if="combatStatus == CombatStatus.Staging" class="flex justify-content-evenly mb-4">
        <Button @click="startCombat" >Start Combat</Button>
        <Button @click="addMonsterToStaging" >Add Custom Monster</Button>
        <Button @click="combatStore.initializePlayers">Reset Players</Button>
    </div>
    <Tabs value="0" v-if="combatStatus != CombatStatus.Active" class="tabs">
        <TabList>
            <Tab value="0">Monsters</Tab>
            <Tab value="1">Players</Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="0">
                <div class="flex flex-wrap">
                    <StagedMonster v-for="monster in stagedMonsters" :monster="monster" />
                </div>
            </TabPanel>
            <TabPanel value="1">
                <div class="flex flex-wrap">
                    <StagedPlayer v-for="player in stagedPlayers" :player="player" />
                </div>
            </TabPanel>
        </TabPanels>
    </Tabs>
    <div v-else>
        <div class="flex justify-content-evenly w-full align-items-center mb-2">
            <div>
                <Button @click="combatStore.previousTurn">Previous</Button>
            </div>
            <Combatant v-if="combatantsByTurn.length > 0" :combatant="combatantsByTurn[0]" @right-click="(e: Event, id: number) => handleRightClick(e, id)"/>
            <div>
                <Button @click="combatStore.nextTurn">Next</Button>
            </div>
        </div>
        <div class="flex flex-wrap">
            <template v-for="(combatant, index) in combatantsByTurn">
                <Combatant v-if="index != 0" :combatant="combatant" class="m-1" @right-click="(e: Event, id: number) => handleRightClick(e, id)"/>
            </template>
        </div>
    </div>
    <TurnTracker v-if="combatStatus == CombatStatus.Active" />
</template>
<style scoped>
.tabs {
    min-width: 50vw;
}
</style>