const { fields } = foundry.data;

type AbilitySchema = foundry.data.fields.NumberField<{
  required: true, initial: 0, nullable: false, integer: true
}>

type AbilitiesSchema = foundry.data.fields.SchemaField<{
  abilityKey: AbilitySchema;
}>;

/** ******************************** */
//        Character Schema
/** ******************************** */
const NPCScheme = () => ({
  abilities: new fields.SchemaField({
    ...Array.from(CONFIG.BLOOD_AND_DOOM.abilities.keys()).reduce((abilities, abilityKey: abilityKey) => {
      abilities[abilityKey] = new fields.NumberField({
        required: true, initial: 0, integer: true, nullable: false
      });

      return abilities;
    }, {})
  }) as unknown as AbilitiesSchema,
  armor: new fields.HTMLField({
    required: true, initial: "", nullable: false
  }),
  armorValue: new fields.StringField({
    required: true, initial: "", nullable: false
  }),
  challenge: new fields.NumberField({
    required: true, initial: 0, nullable: false, min: 0
  }),
  creatureType: new fields.StringField({
    required: true, initial: "", nullable: false
  }),
  evasion: new fields.StringField({
    required: true, initial: "", nullable: false
  }),
  health: new fields.SchemaField({
    bruises: new fields.SchemaField({
      value: new fields.NumberField({
        required: true, min: 0, max: 6, initial: 0, integer: true, nullable: false
      }),
      max: new fields.NumberField({
        required: true, min: 1, max: 6, initial: 2, integer: true, nullable: false
      }),
    }),
    injuries: new fields.SchemaField({
      value: new fields.NumberField({
        required: true, min: 0, max: 6, initial: 0, integer: true, nullable: false
      }),
      max: new fields.NumberField({
        required: true, min: 1, max: 6, initial: 1, integer: true, nullable: false
      }),
    }),
    scrapes: new fields.SchemaField({
      value: new fields.NumberField({
        required: true, min: 0, max: 6, initial: 0, integer: true, nullable: false
      }),
      max: new fields.NumberField({
        required: true, min: 1, max: 6, initial: 2, integer: true, nullable: false
      }),
    }),
    wounds: new fields.SchemaField({
      value: new fields.NumberField({
        required: true, min: 0, max: 6, initial: 0, integer: true, nullable: false
      }),
      max: new fields.NumberField({
        required: true, min: 1, max: 6, initial: 1, integer: true, nullable: false
      }),
    }),
  }),
  other: new fields.HTMLField({
    required: true, initial: "", nullable: false
  }),
  perception: new fields.StringField({
    required: true, initial: "", nullable: false
  }),
  resolve: new fields.SchemaField({
    composure: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false,
    }),
    focus: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false,
    }),
    reflexes: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false,
    }),
    toughness: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false,
    }),
    willpower: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false,
    }),
  }),
  size: new fields.StringField({
    required: true, initial: "Medium", nullable: false
  }),
  skills: new fields.HTMLField({
    required: true, initial: "", nullable: false
  }),
  special: new fields.HTMLField({
    required: true, initial: "", nullable: false
  }),
  speed: new fields.StringField({
    required: true, initial: "Average", nullable: false
  }),
  stealth: new fields.StringField({
    required: true, initial: "", nullable: false
  }),
  traits: new fields.HTMLField({
    required: true, initial: "", nullable: false
  }),
  weakness: new fields.HTMLField({
    required: true, initial: "", nullable: false
  }),
  weapons: new fields.HTMLField({
    required: true, initial: "", nullable: false
  })
});

declare namespace BloodAndDoomNPCData {
  type Schema = DataSchema
    & ReturnType<typeof NPCScheme>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> { }
}

class BloodAndDoomNPCData extends foundry.abstract.TypeDataModel<
  BloodAndDoomNPCData.Schema,
  Actor.ConfiguredInstance,
  BloodAndDoomNPCData.BaseData,
  BloodAndDoomNPCData.DerivedData
> {
  static override defineSchema(): BloodAndDoomNPCData.Schema {
    return {
      ...NPCScheme()
    };
  }

  // This is necessary to ensure that derived data is included in the toObject data.
  override toObject(source: true): this['_source'];
  override toObject(source?: boolean): ReturnType<this['schema']['toObject']>;
  override toObject(source?: boolean): this['_source'] | ReturnType<this['schema']['toObject']> {
    const data = super.toObject(source);

    return data;
  }
}

export { BloodAndDoomNPCData };
