import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { type StagedMonster, CombatStatus, type StagedPlayer, type Combatant } from '@/models';
import { useToast } from 'primevue/usetoast';
import { usePlayerHelpers } from '@/composables/player';
import { rollDice } from '@/composables/dice.ts';

const { getAllPlayers } = usePlayerHelpers();

export const useCombatStore = defineStore('combat', () => {

    const toast = useToast();

    const combatStatus = ref<CombatStatus>(CombatStatus.Staging);

    const stagedMonsters = ref<StagedMonster[]>([]);
    const stagedMonsterNextID = ref<number>(1);

    const stagedPlayers = ref<StagedPlayer[]>(getAllPlayers());

    const combatants = ref<Combatant[]>([]);
    const combatantNextID = ref<number>(1);
    const combatantIndex = ref<number>(0);

    const addMonsterToStaged = (monster: StagedMonster) => {
        monster.id = stagedMonsterNextID.value++;
        stagedMonsters.value.push(monster);
        toast.add({ severity: 'success', summary: 'Added to Combat', detail: monster.name, life: 3000 });
    };

    const addCustomMonsterToStaged = (monster: StagedMonster) => {
        monster.id = stagedMonsterNextID.value++;
        stagedMonsters.value.push(monster);
        toast.add({ severity: 'success', summary: 'Added to Combat', detail: monster.name, life: 3000 });
    };

    const removeMonsterFromStaged = (monsterToRemove: StagedMonster) => {
        stagedMonsters.value = stagedMonsters.value.filter(monster => monster.id !== monsterToRemove.id)
    };

    const duplicateMonsterFromStaged = (monsterToRemove: StagedMonster) => {
        const stagedMonster = { ...monsterToRemove };
        stagedMonster.id = stagedMonsterNextID.value++;
        stagedMonster.count = 1;
        stagedMonsters.value.push(stagedMonster);
        toast.add({ severity: 'success', summary: 'Added Duplicate to Combat', detail: stagedMonster.name, life: 3000 });
    };

    const initializePlayers = () => {
        stagedPlayers.value = getAllPlayers();
    };

    const removePlayerFromStaged = (playerToRemove: StagedPlayer) => {
        stagedPlayers.value = stagedPlayers.value.filter(player => player.id !== playerToRemove.id)
    };

    const startCombat = () => {
        combatStatus.value = CombatStatus.Active;
        const players: Combatant[] = [];

        // Add Players
        for (let i = 0; i < stagedPlayers.value.length; i++) {
            const player = stagedPlayers.value[i];
            players.push({
                id: combatantNextID.value++,
                player: true,
                name: player.name,
                image: player.image,
                initiative: player.initiative
            } as Combatant)
        }

        // Roll for Monsters
        const monsters = rollForMonsters();

        const _combatants = players.concat(monsters);

        // Sort
        combatants.value = sortByInitiative(_combatants);
    };

    const combatantsByTurn = computed(() => {

        // Create a new array that starts with the active combatant and ends with the last one to go
        const rotatedCombatants = [
            ...combatants.value.slice(combatantIndex.value),  // Combatants from active to the end
            ...combatants.value.slice(0, combatantIndex.value) // Combatants from start to active combatant
        ];

        return rotatedCombatants;
    });

    const sortByInitiative = (arr: Combatant[]) => {
        return arr.sort((a, b) => {
            if (a.initiative === undefined) return 1;
            if (b.initiative === undefined) return -1;
            return b.initiative - a.initiative;
        });
    };

    const nextTurn = () => {
        combatantIndex.value++;
        if (combatantIndex.value >= combatants.value.length) {
            combatantIndex.value = 0;
        }
    };

    const previousTurn = () => {
        combatantIndex.value--;
        if (combatantIndex.value < 0) {
            combatantIndex.value = combatants.value.length - 1;
        }
    };

    const rollForMonsters = () => {
        let activeMonsters : Combatant[] = [];
        for (let i = 0; i < stagedMonsters.value.length; i++) {
            const monster = stagedMonsters.value[i];
            if (monster.count && monster.count > 1) {
                for (let j = 0; j < monster.count; j++) {
                    activeMonsters.push({
                        id: combatantNextID.value++,
                        name: `${monster.name} (${j})`,
                        image: monster.image,
                        initiative: rollDice(20, monster.modifier)
                    })
                }
            } else {
                activeMonsters.push({
                    id: combatantNextID.value++,
                    name: monster.name,
                    image: monster.image,
                    initiative: rollDice(20, monster.modifier)
                })
            }
        }
        return activeMonsters
    };

    const removeCombatantByID = (id: number) => {

        const indexToRemove = combatants.value.findIndex(combatant => combatant.id === id);

        combatants.value.splice(indexToRemove, 1);

        if (indexToRemove === combatants.value.length - 1) {
            nextTurn();
        }

    };

    const handleKeyBoard = (e: any) => {
        if (e.key == 'ArrowRight' && combatStatus.value == CombatStatus.Active) {
            nextTurn();
        } else if (e.key == 'ArrowLeft' && combatStatus.value == CombatStatus.Active) {
            previousTurn();
        }
    };

    return {
        combatStatus,
        combatants,
        combatantIndex,
        stagedMonsters,
        stagedPlayers,
        combatantsByTurn,
        handleKeyBoard,
        initializePlayers,
        addMonsterToStaged,
        removeMonsterFromStaged,
        duplicateMonsterFromStaged,
        removePlayerFromStaged,
        startCombat,
        nextTurn,
        previousTurn,
        removeCombatantByID,
        addCustomMonsterToStaged
    }

})