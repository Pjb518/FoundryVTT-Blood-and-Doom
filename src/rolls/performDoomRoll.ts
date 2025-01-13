export default async function performDoomRoll(diceQuantity: number) {
  const roll = new Roll(`${diceQuantity}d10`)
  await roll.evaluate();

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
    type: 'doom',
    rolls: [roll],
    system: {
      diceQuantity,
      setback: false,
      successes
    }
  }

  ChatMessage.applyRollMode(chatData, game!.settings?.get('core', 'rollMode'));
  const chatCard = await ChatMessage.create(chatData);

  return chatCard ?? null;
}
