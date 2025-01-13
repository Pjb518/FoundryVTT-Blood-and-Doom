const { fields } = foundry.data;

const miscellaneousObjectSchema = () => ({
  description: new fields.HTMLField({
    required: true, initial: "", nullable: false
  })
});

declare namespace BloodAndDoomMiscellaneousObjectData {
  type Schema = DataSchema
    & ReturnType<typeof miscellaneousObjectSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomMiscellaneousObjectData extends foundry.abstract.TypeDataModel<
  BloodAndDoomMiscellaneousObjectData.Schema,
  Actor.ConfiguredInstance,
  BloodAndDoomMiscellaneousObjectData.BaseData,
  BloodAndDoomMiscellaneousObjectData.DerivedData
> {
  static override defineSchema(): BloodAndDoomMiscellaneousObjectData.Schema {
    return {
      ...miscellaneousObjectSchema()
    };
  }
}

export { BloodAndDoomMiscellaneousObjectData };
