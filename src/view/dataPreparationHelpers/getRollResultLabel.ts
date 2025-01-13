import localize from "#utils/localize.ts";

export default function getRollResultLabel(successes, difficultyLevel, doom = false) {
  const basePath = "BLOOD_AND_DOOM.rollResults";

  if (successes < difficultyLevel) return localize(`${basePath}.failure`);
  if (successes === difficultyLevel) return localize(`${basePath}.success`);
  if (doom) return localize(`${basePath}.success`);

  return localize(`${basePath}.successWithExcess`, {
    excess: (successes - difficultyLevel).toString(),
  });
}
