import type { DeepPartial } from '@league-of-foundry-developers/foundry-vtt-types/src/types/utils.d.mts';
import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.ts';

import MonsterTraitConfigDialogComponent from "#view/dialogs/MonsterTraitConfigDialog.svelte";
import { SvelteActorSheet } from '#lib/SvelteActorSheet.svelte.js';

export default class MonsterTraitConfigDialog extends SvelteApplicationMixin(SvelteActorSheet) {
  constructor(actor: { document: BloodAndDoomCharacter }, options = {} as Configuration) {
    // @ts-ignore
    super(foundry.utils.mergeObject(options, {
      document: actor.document,
      svelte: {
        document: actor.document,
        component: MonsterTraitConfigDialogComponent
      },
    }));

    this.props = {
      actor: this.document,
      sheet: this,
      trait: this.options.trait
    };
  }


  static override DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ['bnd-sheet', 'bnd-sheet--monster-trait-config'],
    position: {
      height: 'auto',
      width: 552,
    },
    window: {
      controls: [],
    },
    actions: {}
  }, { inplace: false });
}
