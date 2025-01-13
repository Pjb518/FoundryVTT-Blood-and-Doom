const { fields } = foundry.data;

const equipmentSchema = () => ({
  dented: new fields.BooleanField({
    required: true, initial: false, nullable: false
  }),
  info: new fields.StringField({
    required: true, initial: "", nullable: false
  }),
  quantity: new fields.SchemaField({
    value: new fields.NumberField({
      required: true, integer: true, initial: 1, min: 0, nullable: false
    }),
    max: new fields.NumberField({
      required: true, integer: true, initial: 1, min: 0, nullable: false
    })
  })
});

declare namespace BloodAndDoomEquipmentData {
  type Schema = DataSchema
    & ReturnType<typeof equipmentSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomEquipmentData extends foundry.abstract.TypeDataModel<
  BloodAndDoomEquipmentData.Schema,
  Actor.ConfiguredInstance,
  BloodAndDoomEquipmentData.BaseData,
  BloodAndDoomEquipmentData.DerivedData
> {
  static override defineSchema(): BloodAndDoomEquipmentData.Schema {
    return {
      ...equipmentSchema()
    };
  }
}

export { BloodAndDoomEquipmentData };
