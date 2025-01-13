const { fields } = foundry.data;

const ammunitionSchema = () => ({
  quantity: new fields.SchemaField({
    value: new fields.NumberField({
      required: true, integer: true, initial: 9, min: 0, nullable: false
    }),
    max: new fields.NumberField({
      required: true, integer: true, initial: 9, min: 0, nullable: false
    })
  })
});

declare namespace BloodAndDoomAmmunitionData {
  type Schema = DataSchema
    & ReturnType<typeof ammunitionSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomAmmunitionData extends foundry.abstract.TypeDataModel<
  BloodAndDoomAmmunitionData.Schema,
  Actor.ConfiguredInstance,
  BloodAndDoomAmmunitionData.BaseData,
  BloodAndDoomAmmunitionData.DerivedData
> {
  static override defineSchema(): BloodAndDoomAmmunitionData.Schema {
    return {
      ...ammunitionSchema()
    };
  }
}

export { BloodAndDoomAmmunitionData };
