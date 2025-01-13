import type RollTerm from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/client-esm/dice/terms/term.d.mts";

import { SetbackDie } from "../documents/dice/SetbackDie.ts";

export default async function performActionRoll(diceQuantity: number, difficulty: string) {
  const rollTerms: RollTerm[] = [new SetbackDie({})];

  if (diceQuantity > 1) {
    rollTerms.push(
      new foundry.dice.terms.OperatorTerm({ operator: "+" }),
      new foundry.dice.terms.Die({ number: diceQuantity - 1, faces: 10 })
    );
  }

  const roll = Roll.fromTerms(rollTerms);
  await roll.evaluate();

  const setbackDie = roll.terms.find(term => term.constructor.name === "SetbackDie") as SetbackDie;
  setbackDie.options.appearance = { colorset: "black" };

  const successes = roll.dice.reduce((successCount, die) => {
    return successCount + die.results.reduce((results, { active, result }) => {
      if (!active) return results;

      if (result === 10) return results + 2;
      if (result >= 8) return results + 1;

      return results;
    }, 0);
  }, 0);


  const chatData = {
    author: game.user?.id,
    type: 'action',
    rolls: [roll],
    system: {
      diceQuantity,
      difficulty,
      setback: setbackDie.setbackOccurred,
      successes
    }
  }

  ChatMessage.applyRollMode(chatData, game!.settings?.get('core', 'rollMode'));
  const chatCard = await ChatMessage.create(chatData);

  return chatCard ?? null;
}
