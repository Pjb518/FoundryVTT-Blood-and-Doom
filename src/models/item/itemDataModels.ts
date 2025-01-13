import { BloodAndDoomAmmunitionData } from "./AmmunitionDataModel.ts";
import { BloodAndDoomEquipmentData } from "./EquipmentDataModel.ts";
import { BloodAndDoomMiscellaneousObjectData } from "./MiscellaneousObjectDataModel.ts";
import { BloodAndDoomMonsterFeatureData } from "./MonsterFeatureDataModel.ts";
import { BloodAndDoomWeaponData } from "./WeaponDataModel.ts";

const itemDataModels = {
  ammunition: BloodAndDoomAmmunitionData,
  equipment: BloodAndDoomEquipmentData,
  miscellaneous: BloodAndDoomMiscellaneousObjectData,
  monsterFeature: BloodAndDoomMonsterFeatureData,
  weapon: BloodAndDoomWeaponData
};

export default itemDataModels;

// Merge types into fvtt-types
declare global {
  interface DataModelConfig {
    Item: {
      ammunition: BloodAndDoomAmmunitionData,
      equipment: BloodAndDoomEquipmentData,
      miscellaneous: BloodAndDoomMiscellaneousObjectData,
      monsterFeature: BloodAndDoomMonsterFeatureData,
      weapon: BloodAndDoomWeaponData
    }
  }
}
