import type { BloodAndDoomCombatant } from './combatant.svelte.ts';
import { createSubscriber } from 'svelte/reactivity';

export class BloodAndDoomCombat extends Combat {
  #subscribe;

  constructor(data, context) {
    super(data, context);

    this.#subscribe = createSubscriber((update) => {
      const updateCombat = Hooks.on('updateCombat', (combat) => {
        if (combat.id === this.id) update();
      });

      const combatantHooks = ['create', 'delete', 'update'].reduce(
        (hooks, hookType) => {
          hooks[hookType] = Hooks.on(`${hookType}Combatant`, (combatant, _, { diff }) => {
            if (diff === false) return;
            if (combatant.parent?.id === this.id) update();
          });

          return hooks;
        },
        {} as Record<string, number>,
      );

      return () => {
        Hooks.off('updateCombat', updateCombat);
        Hooks.off('createCombatant', combatantHooks.create);
        Hooks.off('deleteCombatant', combatantHooks.delete);
        Hooks.off('updateCombatant', combatantHooks.update);
      };
    });
  }

  get reactive() {
    this.#subscribe();

    return this;
  }

  override async _onEndTurn(combatant) {
    await super._onEndTurn(combatant);
  }

  override async _onEndRound() {
    await this.updateEmbeddedDocuments(
      'Combatant',
      this.combatants.reduce((updates, currentCombatant) => {
        updates.push({
          _id: currentCombatant.id,
          "system.turnTaken": false
        });

        return updates;
      }, [] as Record<string, unknown>[]),
    );
  }

  async updateCombatant(
    combatantID: string,
    updates: Record<string, any>,
  ): Promise<BloodAndDoomCombatant | undefined> {
    const combatant = this.combatants.get(combatantID) as BloodAndDoomCombatant | undefined;

    if (!combatant) {
      // eslint-disable-next-line no-console
      console.error(
        `Attempted to update combatant with id ${combatantID}, but the combatant could not be found.`,
      );
      return undefined;
    }

    return combatant.update(updates);
  }

  override async rollInitiative(
    ids: string | string[],
    { formula = undefined, updateTurn = true, messageOptions = {}, rollOptions = {} } = {} as {
      formula: string | undefined;
      updateTurn: boolean;
      messageOptions: Record<string, any>;
      rollOptions: Record<string, any>;
    },
  ) {
    // Structure Input data
    ids = typeof ids === 'string' ? [ids] : ids;
    const currentId = this.combatant?.id;

    // Iterate over Combatants, performing an initiative roll for each
    const updates: Record<string, any>[] = [];
    const messages: any[] = [];

    for await (const [i, id] of ids.entries()) {
      // Get Combatant data (non-strictly)
      const combatant = this.combatants.get(id);
      const combatantUpdates = { _id: id, initiative: 0 };
      if (!combatant?.isOwner) continue;

      // Produce an initiative roll for the Combatant
      const roll = combatant.getInitiativeRoll(formula);
      await roll.evaluate();

      updates.push(combatantUpdates);
    }

    // Update multiple combatants
    await this.updateEmbeddedDocuments('Combatant', updates);

    // Ensure the turn order remains with the same combatant
    if (updateTurn && currentId) {
      await this.update({ turn: this.turns.findIndex((t) => t.id === currentId) });
    }

    return this;
  }

  override _sortCombatants(a, b) {
    if (a.defeated && !b.defeated) return 1;
    if (b.defeated && !a.defeated) return -1;

    return a.name.localeCompare(b.name);
  }

  async _onDrop(event: DragEvent & { target: EventTarget & HTMLElement }) {
    event.preventDefault();
    const dropData = TextEditor.getDragEventData(event) as unknown as Record<string, string>;

    const { combatants } = this;

    const source = fromUuidSync(dropData.uuid);
    if (!source) return false;

    const dropTarget = event.target!.closest('[data-combatant-id]') as HTMLElement;
    if (!dropTarget) return false;

    const target = combatants.get(dropTarget.dataset.combatantId ?? "");

    if (source.id === target?.id) return false;

    const siblings = this.turns.filter((c) => c.id !== source.id);

    const sortBefore =
      event.y <
      dropTarget.getBoundingClientRect().top + dropTarget.getBoundingClientRect().height / 2;

    // Perform the sort
    const sortUpdates = SortingHelpers.performIntegerSort(source, {
      target,
      siblings,
      sortKey: 'system.sort',
      sortBefore,
    });

    const updateData = sortUpdates.map((u) => {
      const { update } = u;
      update._id = u.target?.id;
      return update;
    });

    const updates = await this.updateEmbeddedDocuments('Combatant', updateData);
    this.turns = this.setupTurns();

    return updates;
  }
}
