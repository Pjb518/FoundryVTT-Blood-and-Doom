import { BLOOD_AND_DOOM } from './config.ts';

const BLOOD_AND_DOOM_GAME = {
  applications: {},
  config: BLOOD_AND_DOOM,
  documentClasses: {
    Actor: BLOOD_AND_DOOM.Actor.documentClasses,
    Combat: BLOOD_AND_DOOM.Combat.documentClass,
    Combatant: BLOOD_AND_DOOM.Combatant.documentClass,
    Item: BLOOD_AND_DOOM.Item.documentClasses,
    Token: BLOOD_AND_DOOM.Token.documentClass,
  }
}

export { BLOOD_AND_DOOM_GAME }
