import type { BloodAndDoomCharacterData } from '../../models/actor/CharacterDataModel.ts';
import { BloodAndDoomBaseActor } from './base.svelte.ts';

import GenericDialog from '../dialogs/GenericDialog.svelte.ts';
import KnowledgeSkillsConfigDialog from "../../view/dialogs/KnowledgeSkillsConfigDialog.svelte"

export class BloodAndDoomCharacter extends BloodAndDoomBaseActor {
  declare system: BloodAndDoomCharacterData;

  /** ------------------------------------------------------ */
  /**                 Data Prep Functions                    */
  /** ------------------------------------------------------ */
  override prepareDerivedData(): void {
    super.prepareDerivedData();

    const actorData = this.system;

    actorData.abilities['mind'] = this.calculateMindScore(actorData);
    actorData.magic["total"] = actorData.magic.ability + actorData.magic.skill;
  }

  calculateMindScore(actorData): number {
    const baseMindScores = [
      actorData.abilities['awareness'],
      actorData.abilities['intellect'],
      actorData.abilities['wisdom']
    ];

    const sumOfBaseScore = baseMindScores.reduce((a, b) => a + b);

    return Math.ceil(sumOfBaseScore / 3);
  }

  async configureKnowledgeSkills() {
    const dialog = new GenericDialog(
      `${this.name}: Configure Knowledge Skills`,
      KnowledgeSkillsConfigDialog,
      { document: this },
      { icon: 'fa-solid fa-book-icon' }
    )

    dialog.render(true)
  }

  async triggerLongRest() {
    const madness = this.system.health.madness.value;

    this.update({
      "system.health": {
        "bruises.value": 0,
        "madness.value": Math.max(0, madness - 3),
        "scrapes.value": 0,
        "wounds.value": 0,
      }
    })
  }
}
