import type { Monster, StagedMonster } from "@/models";
import { useAbilityScoreHelpers } from '@/composables/ability-score.ts';
import { useImageHelpers } from '@/composables/image-finder';

const { convertScoreToModifier } = useAbilityScoreHelpers();
const { findMonsterImagePath } = useImageHelpers();

export function useTypeConversionHelpers() {

    function convertMonsterToStagedMonster (monster: Monster, id: number) {
        return {
            id,
            name: monster.name,
            count: 1,
            image: findMonsterImagePath(monster),
            modifier: convertScoreToModifier(monster.dexterity)
        } as StagedMonster;
    }

    return {
        convertMonsterToStagedMonster
    }
}