import type { BLOOD_AND_DOOM } from "../src/config.ts";
import type { BLOOD_AND_DOOM_GAME } from "../src/game.ts";

declare global {
  interface CONFIG {
    BLOOD_AND_DOOM: typeof BLOOD_AND_DOOM
  }

  interface Game {
    bloodAndDoom: typeof BLOOD_AND_DOOM_GAME
  }
}
