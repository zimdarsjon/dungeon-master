import type { APIMonster, Open5eMonster, StagedMonster } from "@/models";
import { useAbilityScoreHelpers } from '@/composables/ability-score.ts';
import { useImageHelpers } from '@/composables/image-finder';
import APIService from '@/services/APIService';

const { convertScoreToModifier } = useAbilityScoreHelpers();
const { findOpenMonsterImagePath, findBaseMonsterImagePath } = useImageHelpers();

export function useTypeConversionHelpers() {

    function convertOpenMonsterToStagedMonster (monster: Open5eMonster) {
        return {
            name: monster.name,
            count: 1,
            image: findOpenMonsterImagePath(monster),
            modifier: convertScoreToModifier(monster.dexterity)
        } as StagedMonster;
    };

    async function convertBaseMonsterToStagedMonster (monsterIndex: string) {
        let monster = null;
        await APIService.getMonster(monsterIndex)
        .then(response => {
            if (response?.data) {
                const _monster : APIMonster = response.data;
                monster = {
                    name: _monster.name,
                    count: 1,
                    image: findBaseMonsterImagePath(_monster),
                    modifier: convertScoreToModifier(_monster.dexterity)
                } as StagedMonster;
            }
        });
        return monster;
    }

    return {
        convertOpenMonsterToStagedMonster,
        convertBaseMonsterToStagedMonster
    }
}