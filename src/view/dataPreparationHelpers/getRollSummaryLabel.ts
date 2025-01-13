import localize from "#utils/localize.ts";
import { BLOOD_AND_DOOM } from "../../config.ts";

const { DIFFICULTY_LEVELS } = BLOOD_AND_DOOM;

export default function getRollSummaryLabel(successes, difficultyLevel) {
  const basePath = "BLOOD_AND_DOOM.rollSummaries";

  if (difficultyLevel) {
    if (successes === 1) {
      return localize(`${basePath}.successWithDifficulty`, {
        difficulty: difficultyLevel.toString(),
      });
    }

    return localize(`${basePath}.successesWithDifficulty`, {
      successes,
      difficulty: difficultyLevel.toString(),
    });
  }

  if (successes === 1) {
    return localize(`${basePath}.success`);
  }

  return localize(`${basePath}.successes`, { successes });
}
