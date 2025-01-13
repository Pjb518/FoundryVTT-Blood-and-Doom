import type { BloodAndDoomWeaponData } from '../../models/item/WeaponDataModel.ts';
import type { BloodAndDoomBaseActor } from '../actor/base.svelte.ts';
import { createSubscriber } from "svelte/reactivity";

export type SystemItemTypes = Exclude<foundry.documents.BaseItem.TypeNames, 'base'>;

// @ts-ignore - Ignore infinite type check
interface BloodAndDoomBaseItem<ItemType extends SystemItemTypes = SystemItemTypes> {
  type: ItemType;
  system: DataModelConfig['Item'][ItemType];
  parent: BloodAndDoomBaseActor

  prepareActorData?(): void;
}

/**
 * Override and extend the basic Item implementation.
 * @extends {Item}
 */
class BloodAndDoomBaseItem extends Item {
  declare initialized: boolean;

  #subscribe: any;

  constructor(data, context) {
    super(data, context);

    this.#subscribe = createSubscriber((update) => {
      const updateItemHook = Hooks.on(
        "updateItem",
        (triggeringDocument, _, { diff }) => {
          if (diff === false) return;

          if (triggeringDocument._id === this.id) update()
        },
      );

      return () => {
        Hooks.off("updateItem", updateItemHook)
      }
    })
  }

  /** ------------------------------------------------------ */
  /**                    Type Helpers                        */
  /** ------------------------------------------------------ */
  isType<TypeName extends SystemItemTypes>(type: TypeName): this is BloodAndDoomBaseItem<TypeName> {
    return type === this.type as SystemItemTypes;
  }

  get sourceId(): string {
    // @ts-expect-error
    return this._stats.compendiumSource || this.flags?.core?.source || undefined;
  }

  protected override _initialize(options?: Record<string, unknown>) {
    this.initialized = false;
    super._initialize(options);
  }

  override prepareData() {
    if (this.initialized) return;

    if (!this.parent || this.parent.initialized) {
      this.initialized = true;
      super.prepareData();
    }
  }

  /** ------------------------------------------------------ */
  /**                  Reactive Data                         */
  /** ------------------------------------------------------ */

  get reactive() {
    this.#subscribe();

    return this;
  }

  async rollDamage(options): Promise<ChatMessage | null> {
    if (this.type !== "weapon") return null;

    const damageFormula = (this.system as BloodAndDoomWeaponData).damage.formula;

    if (!damageFormula) return null;

    const roll = new Roll(damageFormula);
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
}

export { BloodAndDoomBaseItem };
