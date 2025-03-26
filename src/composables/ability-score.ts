export function useAbilityScoreHelpers() {

    function convertScoreToModifier (score: number) {
        // if (score < 1 || score > 30) {
        //     throw new Error("Ability score must be between 1 and 30.");
        // }
        return Math.floor((score - 10) / 2);
    }

    return {
        convertScoreToModifier
    }
}