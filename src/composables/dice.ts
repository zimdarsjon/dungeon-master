export function rollDice(dice: number, modifier?: number, advantageDisadvantage?: Boolean) {

    let diceRoll = Math.floor(Math.random() * dice) + 1;
    let result = diceRoll + (modifier ?? 0);

    if (advantageDisadvantage !== undefined) {

        let alternateDiceRoll = Math.floor(Math.random() * dice) + 1;
        let alternateResult = alternateDiceRoll + (modifier ?? 0);

        if (advantageDisadvantage && alternateResult > result) {
            result = alternateResult;
        } else if (!advantageDisadvantage && alternateResult < result) {
            result = alternateResult;
        }
    };
    
    return result;
  }