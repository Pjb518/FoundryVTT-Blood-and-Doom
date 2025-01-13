const { fields } = foundry.data;

const bloodAndDoomCharacterCombatantSchema = () => ({
  notes: new fields.StringField({ required: true, nullable: false, initial: "" }),
  sort: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
  turnTaken: new fields.BooleanField({ required: true, nullable: false, initial: false }),
});

declare namespace BloodAndDoomCharacterCombatantData {
  type Schema = DataSchema & ReturnType<typeof bloodAndDoomCharacterCombatantSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomCharacterCombatantData extends foundry.abstract.TypeDataModel<
  BloodAndDoomCharacterCombatantData.Schema,
  ChatMessage.ConfiguredInstance,
  BloodAndDoomCharacterCombatantData.BaseData,
  BloodAndDoomCharacterCombatantData.DerivedData
> {
  static override defineSchema(): BloodAndDoomCharacterCombatantData.Schema {
    return {
      ...bloodAndDoomCharacterCombatantSchema(),
    };
  }
}

export { BloodAndDoomCharacterCombatantData };
