import { BloodAndDoomBaseActor } from './base.svelte.ts';

/** A `Proxy` to to get Foundry to construct `BloodAndDoomActor` subclasses */
export default new Proxy(BloodAndDoomBaseActor, {
  construct(_target, args) {
    const ActorClass = CONFIG.BLOOD_AND_DOOM.Actor.documentClasses[args[0].type] ?? BloodAndDoomBaseActor;
    return new ActorClass(...args);
  }
});
