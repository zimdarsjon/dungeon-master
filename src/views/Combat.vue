<script lang="ts" setup>
import { Button, Tabs, TabList, Tab, TabPanels, TabPanel } from 'primevue';
import { useCombatStore } from '@/stores/combat';
import { CombatStatus } from '@/models';
import { storeToRefs } from 'pinia';
import StagedMonster from '@/components/combat/StagedMonster.vue';


const combatStore = useCombatStore();

const { combatStatus, stagedMonsters } = storeToRefs(combatStore);

</script>
<template>
    <h1>Combat</h1>
    <Button @click="combatStatus = CombatStatus.Staging" v-if="combatStatus == CombatStatus.Inactive">Initiate</Button>
    <Tabs value="0">
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
                <p class="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo. Nemo enim
                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                    dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam
                    eius modi.
                </p>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>