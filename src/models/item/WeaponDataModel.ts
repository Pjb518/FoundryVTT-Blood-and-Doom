const { fields } = foundry.data;

const weaponSchema = () => ({
  abilitySkillMod: new fields.NumberField({
    required: true, initial: 0, nullable: false, integer: true
  }),
  attributes: new fields.StringField({
    required: true, initial: "", nullable: false
  }),
  damage: new fields.SchemaField({
    type: new fields.StringField({ required: true, initial: "", nullable: false }),
    formula: new fields.StringField({ required: true, initial: "", nullable: false })
  }),
  dented: new fields.BooleanField({
    required: true, initial: false, nullable: false
  })
});

declare namespace BloodAndDoomWeaponData {
  type Schema = DataSchema
    & ReturnType<typeof weaponSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomWeaponData extends foundry.abstract.TypeDataModel<
  BloodAndDoomWeaponData.Schema,
  Actor.ConfiguredInstance,
  BloodAndDoomWeaponData.BaseData,
  BloodAndDoomWeaponData.DerivedData
> {
  static override defineSchema(): BloodAndDoomWeaponData.Schema {
    return {
      ...weaponSchema()
    };
  }
}

export { BloodAndDoomWeaponData };
