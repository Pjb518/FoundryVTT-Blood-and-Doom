import { BloodAndDoomActionCardData } from "./ActionCardDataModel.ts";
import { BloodAndDoomDamageCardData } from "./DamageCardDataModel.ts";
import { BloodAndDoomDoomCardData } from "./DoomCardDataModel.ts";

const chatDataModels = {
  action: BloodAndDoomActionCardData,
  damage: BloodAndDoomDamageCardData,
  doom: BloodAndDoomDoomCardData
};

export default chatDataModels;

declare global {
  interface DataModelConfig {
    ChatMessage: {
      action: BloodAndDoomActionCardData;
      damage: BloodAndDoomDamageCardData;
      doom: BloodAndDoomDoomCardData;
    }
  }
}
