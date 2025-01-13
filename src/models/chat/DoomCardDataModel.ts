const { fields } = foundry.data;

const doomCardSchema = () => ({
  diceQuantity: new fields.NumberField({
    required: true, initial: 0, integer: true, nullable: false
  }),
  setback: new fields.BooleanField({
    required: true, initial: false, nullable: false
  }),
  successes: new fields.NumberField({
    required: true, initial: 0, integer: true, nullable: false
  })
});

declare namespace BloodAndDoomDoomCardData {
  type Schema = DataSchema
    & ReturnType<typeof doomCardSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomDoomCardData extends foundry.abstract.TypeDataModel<
  BloodAndDoomDoomCardData.Schema,
  ChatMessage.ConfiguredInstance,
  BloodAndDoomDoomCardData.BaseData,
  BloodAndDoomDoomCardData.DerivedData
> {
  static override defineSchema(): BloodAndDoomDoomCardData.Schema {
    return {
      ...doomCardSchema(),
    };
  }
}

export { BloodAndDoomDoomCardData };
