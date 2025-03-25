<script lang="ts" setup>
import type { Monster } from '@/models';
import Card from 'primevue/card';
import { useAbilityScoreHelpers } from '@/composables/ability-score.ts';

const { convertScoreToModifier } = useAbilityScoreHelpers();

const props = defineProps<{
    monster: Monster
}>();

</script>
<template>
    <Card>
        <template #title>Abilty Scores</template>
        <template #content>
            <div class="flex justify-content-center">
                <div class="score-card ml-1 mr-1 p-1">
                    <label>STR</label>
                    <div>
                        <span>{{ props.monster.strength }}</span>
                        <span>({{ convertScoreToModifier(props.monster.strength) > 0 ? `+${convertScoreToModifier(props.monster.strength) }` : convertScoreToModifier(props.monster.strength) }})</span>
                    </div>
                </div>
                <div class="score-card ml-1 mr-1 p-1">
                    <label>DEX</label>
                    <div>
                        <span>{{ props.monster.dexterity }}</span>
                        <span>({{ convertScoreToModifier(props.monster.dexterity) > 0 ? `+${convertScoreToModifier(props.monster.dexterity) }` : convertScoreToModifier(props.monster.dexterity) }})</span>
                    </div>
                </div>
                <div class="score-card ml-1 mr-1 p-1">
                    <label>CON</label>
                    <div>
                        <span>{{ props.monster.constitution }}</span>
                        <span>({{ convertScoreToModifier(props.monster.constitution) > 0 ? `+${convertScoreToModifier(props.monster.constitution) }` : convertScoreToModifier(props.monster.constitution) }})</span>
                    </div>
                </div>
                <div class="score-card ml-1 mr-1 p-1">
                    <label>INT</label>
                    <div>
                        <span>{{ props.monster.intelligence }}</span>
                        <span>({{ convertScoreToModifier(props.monster.intelligence) > 0 ? `+${convertScoreToModifier(props.monster.intelligence) }` : convertScoreToModifier(props.monster.intelligence) }})</span>
                    </div>
                </div>
                <div class="score-card ml-1 mr-1 p-1">
                    <label>WIS</label>
                    <div>
                        <span>{{ props.monster.wisdom }}</span>
                        <span>({{ convertScoreToModifier(props.monster.wisdom) > 0 ? `+${convertScoreToModifier(props.monster.wisdom) }` : convertScoreToModifier(props.monster.wisdom) }})</span>
                    </div>
                </div>
                <div class="score-card ml-1 mr-1 p-1">
                    <label>CHA</label>
                    <div>
                        <span>{{ props.monster.charisma }}</span>
                        <span>({{ convertScoreToModifier(props.monster.charisma) > 0 ? `+${convertScoreToModifier(props.monster.charisma) }` : convertScoreToModifier(props.monster.charisma) }})</span>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>