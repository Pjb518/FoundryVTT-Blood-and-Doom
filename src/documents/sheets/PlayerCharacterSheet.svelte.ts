import PlayerCharacterSheetComponent from '#view/sheets/PlayerCharacterSheet.svelte';
import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.ts';
import { SvelteActorSheet } from '#lib/SvelteActorSheet.svelte.js';

import type { BloodAndDoomCharacter } from '../actor/character.ts';

export default class PlayerCharacterSheet extends SvelteApplicationMixin(SvelteActorSheet) {
  constructor(actor: { document: BloodAndDoomCharacter }, options = {} as Configuration) {
    // @ts-ignore
    super(foundry.utils.mergeObject(options, {
      document: actor.document,
      svelte: {
        document: actor.document,
        component: PlayerCharacterSheetComponent
      }
    }));

    this.props = {
      actor: this.document,
      sheet: this,
    };
  }

  // @ts-ignore
  static override DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ['bnd-sheet', 'bnd-sheet--player-character'],
    window: {
      icon: 'fa-solid fa-user'
    },
    position: {
      width: 768,
      height: 'auto' as 'auto'
    },
    actions: {}
  }, { inplace: false });

  updateTitle(newName) {
    const sheetTitleElement = this.window.title;

    if (!sheetTitleElement) return;

    sheetTitleElement.innerText = `Character: ${newName}`;
  }
}
