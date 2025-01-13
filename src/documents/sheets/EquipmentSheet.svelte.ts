import EquipmentSheetComponent from '#view/sheets/EquipmentSheet.svelte';
import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.ts';
import { SvelteItemSheet } from '#lib/SvelteItemSheet.svelte.js';

import type { BloodAndDoomBaseItem } from '../item/base.svelte.ts';

export default class EquipmentSheet extends SvelteApplicationMixin(SvelteItemSheet) {
  constructor(item: { document: BloodAndDoomBaseItem }, options = {} as Configuration) {
    // @ts-ignore
    super(foundry.utils.mergeObject(options, {
      document: item.document,
      svelte: {
        document: item.document,
        component: EquipmentSheetComponent
      }
    }));

    this.props = {
      item: this.document,
      sheet: this,
    };
  }

  // @ts-ignore
  static override DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ['bnd-sheet', 'bnd-sheet--equipment'],
    window: {
      icon: 'fa-solid fa-suitcase'
    },
    position: {
      width: 352,
      height: 'auto' as 'auto'
    },
    actions: {}
  }, { inplace: false });

  updateTitle(newName) {
    const sheetTitleElement = this.window.title;

    if (!sheetTitleElement) return;

    sheetTitleElement.innerText = `Weapon: ${newName}`;
  }
}
