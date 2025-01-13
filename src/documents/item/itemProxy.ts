import { BloodAndDoomBaseItem } from './base.svelte.ts';

/** A `Proxy` to to get Foundry to construct `BloodAndDoomItem` subclasses */
export default new Proxy(BloodAndDoomBaseItem, {
  construct(_target, args) {
    const ItemCls = CONFIG.BLOOD_AND_DOOM.Item.documentClasses[args[0]?.type] ?? BloodAndDoomBaseItem;
    return new ItemCls(...args);
  }
});
