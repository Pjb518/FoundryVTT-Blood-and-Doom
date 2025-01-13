const { fields } = foundry.data;

const actionCardSchema = () => ({
  diceQuantity: new fields.NumberField({
    required: true, initial: 0, integer: true, nullable: false
  }),
  difficulty: new fields.StringField({
    required: false, initial: "", nullable: true
  }),
  setback: new fields.BooleanField({
    required: true, initial: false, nullable: false
  }),
  successes: new fields.NumberField({
    required: true, initial: 0, integer: true, nullable: false
  })
});

declare namespace BloodAndDoomActionCardData {
  type Schema = DataSchema
    & ReturnType<typeof actionCardSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomActionCardData extends foundry.abstract.TypeDataModel<
  BloodAndDoomActionCardData.Schema,
  ChatMessage.ConfiguredInstance,
  BloodAndDoomActionCardData.BaseData,
  BloodAndDoomActionCardData.DerivedData
> {
  static override defineSchema(): BloodAndDoomActionCardData.Schema {
    return {
      ...actionCardSchema(),
    };
  }
}

export { BloodAndDoomActionCardData };
