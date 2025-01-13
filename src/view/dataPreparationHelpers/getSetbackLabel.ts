import localize from "#utils/localize.ts";

export default function getSetBackLabel(setback, successes, difficultyLevel) {
  const baseSetback = "BLOOD_AND_DOOM.setbacks.base";
  const majorSetback = "BLOOD_AND_DOOM.setbacks.major";
  const minorSetback = "BLOOD_AND_DOOM.setbacks.minor";

  if (!setback) return null;
  if (!difficultyLevel) return localize(baseSetback);
  if (successes < difficultyLevel) return localize(majorSetback);

  return localize(minorSetback);
}
