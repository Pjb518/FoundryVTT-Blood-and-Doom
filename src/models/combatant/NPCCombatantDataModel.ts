const { fields } = foundry.data;

const bloodAndDoomNPCCombatantSchema = () => ({
  notes: new fields.StringField({ required: true, nullable: false, initial: "" }),
  sort: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
  turnTaken: new fields.BooleanField({ required: true, nullable: false, initial: false }),
});

declare namespace BloodAndDoomNPCCombatantData {
  type Schema = DataSchema & ReturnType<typeof bloodAndDoomNPCCombatantSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomNPCCombatantData extends foundry.abstract.TypeDataModel<
  BloodAndDoomNPCCombatantData.Schema,
  ChatMessage.ConfiguredInstance,
  BloodAndDoomNPCCombatantData.BaseData,
  BloodAndDoomNPCCombatantData.DerivedData
> {
  static override defineSchema(): BloodAndDoomNPCCombatantData.Schema {
    return {
      ...bloodAndDoomNPCCombatantSchema(),
    };
  }
}

export { BloodAndDoomNPCCombatantData };
