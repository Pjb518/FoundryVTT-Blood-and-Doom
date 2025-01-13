const { fields } = foundry.data;

const monsterFeatureSchema = () => ({
  description: new fields.HTMLField({
    required: true, initial: "", nullable: false
  })
});

declare namespace BloodAndDoomMonsterFeatureData {
  type Schema = DataSchema
    & ReturnType<typeof monsterFeatureSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomMonsterFeatureData extends foundry.abstract.TypeDataModel<
  BloodAndDoomMonsterFeatureData.Schema,
  Actor.ConfiguredInstance,
  BloodAndDoomMonsterFeatureData.BaseData,
  BloodAndDoomMonsterFeatureData.DerivedData
> {
  static override defineSchema(): BloodAndDoomMonsterFeatureData.Schema {
    return {
      ...monsterFeatureSchema()
    };
  }
}

export { BloodAndDoomMonsterFeatureData };
