import type { BloodAndDoomBaseItem } from '../item/base.svelte.ts';
import { createSubscriber } from "svelte/reactivity";

export type SystemActorTypes = Exclude<foundry.documents.BaseActor.TypeNames, 'base'>;


// @ts-ignore - Ignoring infinite error
interface BloodAndDoomBaseActor<ActorType extends SystemActorTypes = SystemActorTypes> {
  type: ActorType;
  system: DataModelConfig['Actor'][ActorType];
  items: foundry.abstract.EmbeddedCollection<BloodAndDoomBaseItem, Actor.ConfiguredInstance>
}

class BloodAndDoomBaseActor extends Actor {
  declare initialized: boolean;

  #dialogs: any;
  #subscribe: any;

  // *************************************************
  constructor(data, context) {
    super(data, context);

    this.#dialogs = {};

    this.#subscribe = createSubscriber((update) => {
      const updateActorHook = Hooks.on(
        "updateActor",
        (triggeringDocument, _, { diff }) => {
          if (diff === false) return;

          if (triggeringDocument._id === this.id) update()
        },
      );

      const embeddedItemHooks = ["create", "delete", "update"].reduce((hooks, hookType) => {
        hooks[hookType] = Hooks.on(
          `${hookType}Item`,
          (triggeringDocument, _, { diff }) => {
            if (diff === false) return;

            if (triggeringDocument?.actor?._id === this.id) update()
          })

        return hooks;
      }, {})

      return () => {
        Hooks.off("updateActor", updateActorHook);
        Hooks.off("createItem", embeddedItemHooks.create);
        Hooks.off("deleteItem", embeddedItemHooks.delete);
        Hooks.off("updateItem", embeddedItemHooks.update);
      }
    });
  }

  // static override async createDialog<
  //   T extends DocumentConstructor
  // >(
  //   this: T,
  //   data?: DeepPartial<ConstructorDataType<T> | (ConstructorDataType<T> & Record<string, unknown>)>,
  //   context?: Pick<DatabaseCreateOperation<any>, 'parent' | 'pack'> & InexactPartial<DialogOptions & { types: string[]; }>
  // ): Promise<InstanceType<ConfiguredDocumentClass<T>> | null | undefined> {
  //   const {
  //     // @ts-expect-error
  //     parent, pack, types, ...options
  //   } = context;

  //   const dialog = new ActorCreationDialog({
  //     ...data, parent, pack, types
  //     // @ts-expect-error
  //   }, { ...options });

  //   return dialog.render(true);
  // }

  /** ------------------------------------------------------ */
  /**                    Type Helpers                        */
  /** ------------------------------------------------------ */
  isType<TypeName extends SystemActorTypes>(type: TypeName): this is BloodAndDoomBaseActor<TypeName> {
    return type === this.type as SystemActorTypes;
  }

  get sourceId(): string {
    // @ts-expect-error
    return this._stats.compendiumSource || this.flags?.core?.source || undefined;
  }

  /** ------------------------------------------------------ */
  /**                   Data Preparation                     */
  /** ------------------------------------------------------ */
  protected override _initialize(options?: Record<string, unknown>) {
    this.initialized = false;

    super._initialize(options);
  }

  override prepareData(): void {
    if (this.initialized) return;

    this.initialized = true;
    super.prepareData();
  }

  override prepareBaseData(): void {
    super.prepareBaseData();
  }

  override prepareEmbeddedDocuments(): void {
    super.prepareEmbeddedDocuments();

    this._preparePropagatedItemData();
  }

  protected _preparePropagatedItemData(): void {
    for (const item of this.items) {
      item.prepareActorData?.();
    }
  }

  override prepareDerivedData(): void {
    super.prepareDerivedData();
  }

  /** ------------------------------------------------------ */
  /**                  Reactive Data                         */
  /** ------------------------------------------------------ */

  get reactive() {
    this.#subscribe();

    return this;
  }

  /** ------------------------------------------------------ */
  /**                  Data Functions                        */
  /** ------------------------------------------------------ */

  override getRollData(): Record<string, any> {
    const data = { ...super.getRollData() } as Record<string, any>;

    return data;
  }

  async configureItem(id: string): Promise<void> {
    const item = this.items.get(id);

    if (!item) {
      // eslint-disable-next-line no-console
      console.error(`Attempted to display document sheet for item with id ${item}, but the item could not be found.`);
      return;
    }

    item.sheet?.render(true);
  }

  async createItem(data) {
    this.createEmbeddedDocuments('Item', [data], { renderSheet: true });
  }

  async deleteItem(id: string): Promise<Item[]> {
    return this.deleteEmbeddedDocuments('Item', [id]);
  }

  async updateItem(id: string, data: Record<string, any>): Promise<BloodAndDoomBaseItem | undefined> {
    const item = this.items.get(id);

    if (!item) {
      // eslint-disable-next-line no-console
      console.error(`Attempted to update item with id ${item}, but the item could not be found.`);
      return undefined;
    }

    return item.update(data);
  }

  /** ------------------------------------------------------ */
  /**                  Roll Functions                        */
  /** ------------------------------------------------------ */
  async activateItem(
    id: string,
    options: Record<string, any> = {}
  ): Promise<ChatMessage | null> {
    const item = this.items.get(id) as BloodAndDoomBaseItem;

    if (!item) {
      // eslint-disable-next-line no-console
      console.error(`Attempted to activate item with id ${item}, but the item could not be found.`);
      return null;
    }

    return item.activate(options);
  }
}

export { BloodAndDoomBaseActor };
