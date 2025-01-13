import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.ts';
import type { BloodAndDoomNPC } from '../actor/npc.ts';

import { SvelteActorSheet } from '#lib/SvelteActorSheet.svelte.js';
import NPCSheetComponent from '#view/sheets/NPCSheet.svelte';

import createReactiveDocument from '#utils/createReactiveDocument.svelte.ts';

export default class NPCSheet extends SvelteApplicationMixin(SvelteActorSheet) {
  actorData: Record<string, any>;

  constructor(actor: { document: BloodAndDoomNPC }, options = {} as Configuration) {
    // @ts-ignore
    super(foundry.utils.mergeObject(options, {
      document: actor.document,
      svelte: {
        document: actor.document,
        component: NPCSheetComponent
      }
    }));

    this.actorData = createReactiveDocument(actor.document);

    this.props = {
      actor: this.document,
      sheet: this
    };
  }

  static override DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ['bnd-sheet', 'bnd-sheet--npc'],
    window: {
      icon: 'fa-solid fa-ghost'
    },
    position: {
      width: 688,
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
