import type BaseUser from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents/user.d.mts';
import type { BloodAndDoomNPCData } from '../../models/actor/NPCDataModel.ts';
import { BloodAndDoomBaseActor } from './base.svelte.ts';

export class BloodAndDoomNPC extends BloodAndDoomBaseActor {
  declare system: BloodAndDoomNPCData;

  /** ------------------------------------------------------ */
  /**                 Data Prep Functions                    */
  /** ------------------------------------------------------ */
  override prepareBaseData() {
    super.prepareBaseData();
  }

  override prepareDerivedData() {
    super.prepareDerivedData();
  }
}
