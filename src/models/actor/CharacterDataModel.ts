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
const characterSchema = () => ({
  abilities: new fields.SchemaField({
    ...Array.from(CONFIG.BLOOD_AND_DOOM.abilities.keys()).reduce((abilities, abilityKey: abilityKey) => {
      abilities[abilityKey] = new fields.NumberField({
        required: true, initial: 0, integer: true, nullable: false
      });

      return abilities;
    }, {})
  }) as unknown as AbilitiesSchema,
  advancement: new fields.SchemaField({
    firstGroup: new fields.SchemaField({
      gainDamageBoxes: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainFeat: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainKnowledgeSkills: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainLanguages: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainMadnessBoxes: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainProficiencies: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainTrait: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
      improveTrait: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
      increaseSkillRank: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
    }),
    secondGroup: new fields.SchemaField({
      gainDamageBoxes: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
      gainFeat: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainKnowledgeSkills: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainLanguages: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainMadnessBoxes: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainProficiencies: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainTrait: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
      improveTrait: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
      increaseAbilityScores: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      increaseCombatResolveDifficulty: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      increaseEvasionScore: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      increaseResolveScores: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      increaseSkillRank: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
    }),
    thirdGroup: new fields.SchemaField({
      gainDamageBoxes: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
      gainFeat: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainKnowledgeSkills: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainLanguages: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainMadnessBoxes: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainProficiencies: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      gainTrait: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
      improveTrait: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
      increaseAbilityScores: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      increaseCombatResolveDifficulty: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      increaseEvasionScore: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      increaseResolveScores: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 1, integer: true, nullable: false
      }),
      increaseSkillRank: new fields.NumberField({
        required: true, initial: 0, min: 0, max: 2, integer: true, nullable: false
      }),
    })
  }),
  armor: new fields.SchemaField({
    armored: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false
    }),
    dents: new fields.SchemaField({
      max: new fields.NumberField({
        required: true, initial: 2, integer: true, min: 1, max: 5, nullable: false
      }),
      value: new fields.NumberField({
        required: true, initial: 0, integer: true, min: 0, nullable: false
      })
    }),
    info: new fields.StringField({
      required: true, initial: "", nullable: false
    }),
    unarmored: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false
    })
  }),
  assets: new fields.StringField({
    required: true, initial: "", nullable: false
  }),
  bio: new fields.SchemaField({
    appearance: new fields.HTMLField({
      required: true, initial: "", nullable: false
    }),
    background: new fields.HTMLField({
      required: true, initial: "", nullable: false
    }),
    belief: new fields.HTMLField({
      required: true, initial: "", nullable: false
    }),
    bonds: new fields.HTMLField({
      required: true, initial: "", nullable: false
    }),
    drives: new fields.HTMLField({
      required: true, initial: "", nullable: false
    }),
    origin: new fields.HTMLField({
      required: true, initial: "", nullable: false
    }),
    personality: new fields.HTMLField({
      required: true, initial: "", nullable: false
    })
  }),
  bloodPoints: new fields.NumberField({
    required: true, initial: 0, integer: true, nullable: false, min: 0, max: 6
  }),
  class: new fields.StringField({
    required: true, initial: "", nullable: false
  }),
  classResolveDifficulty: new fields.NumberField({
    required: true, initial: 0, integer: true, min: 0, nullable: false
  }),
  combatResolveDifficulty: new fields.NumberField({
    required: true, initial: 0, integer: true, min: 0, nullable: false
  }),
  conditions: new fields.ArrayField(
    new fields.SchemaField({
      treatment: new fields.StringField({
        required: true, initial: "", nullable: false
      }),
      value: new fields.StringField({
        required: true, initial: "", nullable: false
      })
    }),
    {
      required: true, initial: Array.from({ length: 6 }).reduce((acc: Record<string, string>[]) => {
        acc.push({
          treatment: "",
          value: ""
        });

        return acc;
      }, [] as Record<string, string>[]), nullable: false
    }
  ),
  corruption: new fields.NumberField({
    required: true, initial: 0, integer: true, nullable: false, min: 0, max: 6
  }),
  currency: new fields.SchemaField({
    gold: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false, min: 0
    }),
    silver: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false, min: 0
    })
  }),
  discoveredSpells: new fields.ArrayField(
    new fields.StringField({ required: true, initial: "", nullable: false }),
    { required: true, initial: Array.from({ length: 6 }).fill("") as string[] }
  ),
  doomPoints: new fields.NumberField({
    required: true, initial: 0, integer: true, nullable: false, min: 0, max: 6
  }),
  evasion: new fields.SchemaField({
    average: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false,
    }),
    score: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false,
    }),
  }),
  feats: new fields.ArrayField(
    new fields.StringField({ required: true, initial: "", nullable: false }),
    { required: true, initial: Array.from({ length: 6 }).fill("") as string[] }
  ),
  health: new fields.SchemaField({
    bruises: new fields.SchemaField({
      value: new fields.NumberField({
        required: true, min: 0, max: 3, initial: 0, integer: true, nullable: false
      }),
      max: new fields.NumberField({
        required: true, min: 1, max: 3, initial: 2, integer: true, nullable: false
      }),
    }),
    injuries: new fields.SchemaField({
      value: new fields.NumberField({
        required: true, min: 0, max: 3, initial: 0, integer: true, nullable: false
      }),
      max: new fields.NumberField({
        required: true, min: 1, max: 3, initial: 1, integer: true, nullable: false
      }),
    }),
    madness: new fields.SchemaField({
      value: new fields.NumberField({
        required: true, min: 0, max: 10, initial: 0, integer: true, nullable: false
      }),
      max: new fields.NumberField({
        required: true, min: 1, max: 10, initial: 6, integer: true, nullable: false
      }),
    }),
    scrapes: new fields.SchemaField({
      value: new fields.NumberField({
        required: true, min: 0, max: 3, initial: 0, integer: true, nullable: false
      }),
      max: new fields.NumberField({
        required: true, min: 1, max: 3, initial: 2, integer: true, nullable: false
      }),
    }),
    wounds: new fields.SchemaField({
      value: new fields.NumberField({
        required: true, min: 0, max: 3, initial: 0, integer: true, nullable: false
      }),
      max: new fields.NumberField({
        required: true, min: 1, max: 3, initial: 1, integer: true, nullable: false
      }),
    }),
  }),
  level: new fields.NumberField({
    required: true, min: 1, initial: 1, integer: true, nullable: false
  }),
  magic: new fields.SchemaField({
    ability: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false,
    }),
    points: new fields.SchemaField({
      value: new fields.NumberField({
        required: true, initial: 0, integer: true, nullable: false,
      }),
      max: new fields.NumberField({
        required: true, initial: 0, integer: true, nullable: false,
      })
    }),
    skill: new fields.NumberField({
      required: true, initial: 0, integer: true, nullable: false,
    }),
  }),
  languages: new fields.ArrayField(
    new fields.StringField({ required: true, initial: "", nullable: false }),
    { required: true, initial: Array.from({ length: 6 }).fill("") as string[] }
  ),
  momentum: new fields.NumberField({
    required: true, initial: 0, integer: true, nullable: false, min: 0, max: 3
  }),
  proficiencies: new fields.ArrayField(
    new fields.StringField({ required: true, initial: "", nullable: false }),
    { required: true, initial: Array.from({ length: 6 }).fill("") as string[] }
  ),
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
  skills: new fields.SchemaField({
    base: new fields.SchemaField({
      ...Array.from(CONFIG.BLOOD_AND_DOOM.skills.keys()).reduce((skills, skillKey) => {
        skills[skillKey] = new fields.NumberField({
          required: true, initial: 0, integer: true, nullable: false
        });

        return skills;
      }, {})
    }),
    knowledge: new fields.SchemaField({
      ...Array.from(CONFIG.BLOOD_AND_DOOM.knowledgeSkills.keys()).reduce((knowledgeSkills, skillKey) => {
        knowledgeSkills[skillKey] = new fields.SchemaField({
          rank: new fields.NumberField({
            required: true, initial: 0, integer: true, nullable: false
          }),
          trained: new fields.BooleanField({
            required: true, initial: false, nullable: false
          })
        });

        return knowledgeSkills;
      }, {})
    }),
  }),
  traditions: new fields.SchemaField({
    ...["a", "b", "c"].reduce((traditionAcc, traditionKey) => {
      traditionAcc[traditionKey] = new fields.SchemaField({
        name: new fields.StringField({
          required: true, initial: "", nullable: false
        }),
        values: new fields.ArrayField(
          new fields.SchemaField({
            name: new fields.StringField({
              required: true, initial: "", nullable: false
            }),
            uses: new fields.NumberField({
              required: true, initial: 0, nullable: false, min: 0, integer: true
            }),
            improved: new fields.BooleanField({
              required: true, initial: false, nullable: false
            })
          }),
          {
            required: true, initial: Array.from({ length: 6 }).reduce((acc: Record<string, (string | number | boolean)>[]) => {
              acc.push({
                name: "",
                uses: 0,
                improved: false
              });

              return acc;
            }, [] as Record<string, string>[]), nullable: false
          }
        )
      })

      return traditionAcc;
    }, {})
  }),
  unarmedAttacks: new fields.SchemaField({
    abilitySkillMod: new fields.NumberField({
      required: true, initial: 0, nullable: false, integer: true
    }),
    damage: new fields.StringField({ required: true, initial: "1d4", nullable: false })
  }),
  xp: new fields.NumberField({
    required: true, min: 0, initial: 0, integer: true, nullable: false
  }),
});

declare namespace BloodAndDoomCharacterData {
  type Schema = DataSchema
    & ReturnType<typeof characterSchema>;
  interface BaseData extends Record<string, unknown> { }
  interface DerivedData extends Record<string, unknown> {
    abilities: {
      mind: number;
    }
  }
}

class BloodAndDoomCharacterData extends foundry.abstract.TypeDataModel<
  BloodAndDoomCharacterData.Schema,
  Actor.ConfiguredInstance,
  BloodAndDoomCharacterData.BaseData,
  BloodAndDoomCharacterData.DerivedData
> {
  static override defineSchema(): BloodAndDoomCharacterData.Schema {
    return {
      ...characterSchema()
    };
  }
}

export { BloodAndDoomCharacterData };
