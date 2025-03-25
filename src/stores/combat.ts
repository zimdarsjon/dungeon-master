import { ref } from 'vue';
import { defineStore } from 'pinia';
import { type StagedMonster, CombatStatus, type Monster } from '@/models';
import { useToast } from 'primevue/usetoast';
import { useTypeConversionHelpers } from '@/composables/type-conversion.ts';

const { convertMonsterToStagedMonster } = useTypeConversionHelpers();

export const useCombatStore = defineStore('combat', () => {

    const toast = useToast();
  
    const combatStatus = ref<CombatStatus>(CombatStatus.Inactive);
    const combatants = ref<any[]>([]);

    const stagedMonsters = ref<StagedMonster[]>([]);
    const stagedMonsterNextID = ref<number>(1);

    const addMonsterToStaged = (monster: Monster) => {
        const stagedMonster = convertMonsterToStagedMonster(monster, stagedMonsterNextID.value++);
        stagedMonsters.value.push(stagedMonster);
        toast.add({ severity: 'success', summary: 'Added to Combat', detail: stagedMonster.name, life: 3000 });
    };

    const removeMonsterFromStaged = (monsterToRemove: StagedMonster) => {
        stagedMonsters.value = stagedMonsters.value.filter(monster => monster.id !== monsterToRemove.id)
    };

    const duplicateMonsterFromStaged = (monsterToRemove: StagedMonster) => {
        const stagedMonster = { ...monsterToRemove};
        stagedMonster.id = stagedMonsterNextID.value++;
        stagedMonster.count = 1;
        stagedMonsters.value.push(stagedMonster);
        toast.add({ severity: 'success', summary: 'Added Duplicate to Combat', detail: stagedMonster.name, life: 3000 });
    };

    return {
        combatStatus,
        combatants,
        stagedMonsters,
        addMonsterToStaged,
        removeMonsterFromStaged,
        duplicateMonsterFromStaged
    }
        
})