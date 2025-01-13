import type RollTerm from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/client-esm/dice/terms/term.d.mts";

export default async function performDamageRoll(dieSize: string) {
  const formulaTerms: RollTerm[] = [];

  /** Grab dice quantity **/
  const diceQuantityInputElement = document.querySelector(".bnd-roll-interface-die-input--dice-quantity") as HTMLInputElement | null;
  const diceQuantity = Math.max(parseInt(diceQuantityInputElement?.value || "1", 10), 1);

  formulaTerms.push(new foundry.dice.terms.Die({ number: diceQuantity, faces: parseInt(dieSize, 10) }));

  /** Check if damage modifier should be included  in the roll formula **/
  const damageModifierCheckboxElement = document.querySelector(".bnd-roll-interface-checkbox") as HTMLInputElement | null;
  const includeDamageModifier = damageModifierCheckboxElement?.checked ?? true;

  if (includeDamageModifier) {
    /** Grab damage modifier **/
    const damageModifierInputElement = document.querySelector(".bnd-roll-interface-die-input--modifier") as HTMLInputElement | null;
    const damageModifier = parseInt(damageModifierInputElement?.value || "0", 10);

    formulaTerms.push(
      new foundry.dice.terms.OperatorTerm({ operator: damageModifier >= 0 ? "+" : "-" }),
      new foundry.dice.terms.NumericTerm({ number: Math.abs(damageModifier) })
    );
  }

  const roll = Roll.fromTerms(formulaTerms);
  await roll.evaluate()

  const chatData = {
    author: game.user?.id,
    type: 'damage',
    rolls: [roll],
  }

  ChatMessage.applyRollMode(chatData, game!.settings?.get('core', 'rollMode'));
  const chatCard = await ChatMessage.create(chatData);

  return chatCard ?? null;
}
