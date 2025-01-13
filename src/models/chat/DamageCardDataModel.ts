const { fields } = foundry.data;

const damageCardSchema = () => ({});

declare namespace BloodAndDoomDamageCardData {
  type Schema = DataSchema
    & ReturnType<typeof damageCardSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomDamageCardData extends foundry.abstract.TypeDataModel<
  BloodAndDoomDamageCardData.Schema,
  ChatMessage.ConfiguredInstance,
  BloodAndDoomDamageCardData.BaseData,
  BloodAndDoomDamageCardData.DerivedData
> {
  static override defineSchema(): BloodAndDoomDamageCardData.Schema {
    return {
      ...damageCardSchema(),
    };
  }
}

export { BloodAndDoomDamageCardData };
