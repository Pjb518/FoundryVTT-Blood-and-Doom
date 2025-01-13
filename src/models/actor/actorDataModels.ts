import { BloodAndDoomCharacterData } from './CharacterDataModel.js';
import { BloodAndDoomNPCData } from './NPCDataModel.ts';

const actorDataModels = {
  character: BloodAndDoomCharacterData,
  npc: BloodAndDoomNPCData,
};

export default actorDataModels;

declare global {
  interface DataModelConfig {
    Actor: {
      character: BloodAndDoomCharacterData,
      npc: BloodAndDoomNPCData
    }
  }
}
