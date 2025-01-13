import { BloodAndDoomCharacterCombatantData } from './CharacterCombatantDataModel.ts';
import { BloodAndDoomNPCCombatantData } from './NPCCombatantDataModel.ts';

const combatantDataModels = {
  character: BloodAndDoomCharacterCombatantData,
  npc: BloodAndDoomNPCCombatantData,
};

export default combatantDataModels;

// Merge types into fvtt-types
declare global {
  interface DataModelConfig {
    Combatant: {
      character: BloodAndDoomCharacterCombatantData;
      npc: BloodAndDoomNPCCombatantData;
    };
  }
}
