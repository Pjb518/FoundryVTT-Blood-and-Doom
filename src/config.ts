import registerDocumentConfig from "./config/registerDocumentConfig.ts";

const DIFFICULTY_LEVELS: Map<string, number | null> = new Map([
  ["NONE", null],
  ["EASY", 1],
  ["NORMAL", 2],
  ["CHALLENGING", 3],
  ["HARD", 4],
  ["EXTREME", 5],
  ["NIGHTMARE", 6]
]);

const abilities: Map<abilityKey, string> = new Map([
  ["strength", "BLOOD_AND_DOOM.abilities.strength"],
  ["dexterity", "BLOOD_AND_DOOM.abilities.dexterity"],
  ["agility", "BLOOD_AND_DOOM.abilities.agility"],
  ["awareness", "BLOOD_AND_DOOM.abilities.awareness"],
  ["intellect", "BLOOD_AND_DOOM.abilities.intellect"],
  ["wisdom", "BLOOD_AND_DOOM.abilities.wisdom"],
  ["heart", "BLOOD_AND_DOOM.abilities.heart"],
  ["mystique", "BLOOD_AND_DOOM.abilities.mystique"],
  ["presence", "BLOOD_AND_DOOM.abilities.presence"],
]);

const abilityCategories: Map<abilityCategory, string> = new Map([
  ["body", "BLOOD_AND_DOOM.abilityCategories.body"],
  ["mind", "BLOOD_AND_DOOM.abilityCategories.mind"],
  ["soul", "BLOOD_AND_DOOM.abilityCategories.soul"],
]);

const abilityGroupings: Map<abilityCategory, abilityKey[]> = new Map([
  ["body", ["strength", "dexterity", "agility"]],
  ["mind", ["awareness", "intellect", "wisdom"]],
  ["soul", ["heart", "mystique", "presence"]],
]);

const bioEditorButtonLabels: Map<string, string> = new Map([
  ["appearance", "Appearance"],
  ["background", "Background"],
  ["belief", "Belief"],
  ["bonds", "Bonds"],
  ["drives", "Drives"],
  ["origin", "Origin"],
  ["personality", "Personality"]
]);

const bioEditorButtonLabelsOrder: Map<string, number> = new Map([
  ["appearance", 0],
  ["personality", 1],
  ["origin", 2],
  ["bonds", 3],
  ["drives", 4],
  ["belief", 5],
  ["background", 6]
]);

const healthTracks: Map<healthTrackKey, string> = new Map([
  ["bruises", "BLOOD_AND_DOOM.healthTracks.bruises"],
  ["scrapes", "BLOOD_AND_DOOM.healthTracks.scrapes"],
  ["wounds", "BLOOD_AND_DOOM.healthTracks.wounds"],
  ["injuries", "BLOOD_AND_DOOM.healthTracks.injuries"],
  ["madness", "BLOOD_AND_DOOM.healthTracks.madness"],
]);

const healthTrackAbbreviations: Map<healthTrackKey, string> = new Map([
  ["bruises", "BLOOD_AND_DOOM.healthTrackAbbreviations.bruises"],
  ["scrapes", "BLOOD_AND_DOOM.healthTrackAbbreviations.scrapes"],
  ["wounds", "BLOOD_AND_DOOM.healthTrackAbbreviations.wounds"],
  ["injuries", "BLOOD_AND_DOOM.healthTrackAbbreviations.injuries"]
]);

const healthTrackMaximums: Map<healthTrackKey, number> = new Map([
  ["bruises", 3],
  ["scrapes", 3],
  ["wounds", 3],
  ["injuries", 3],
  ["madness", 10],
]);


const healthTrackOrder: Map<healthTrackKey, number> = new Map([
  ["bruises", 0],
  ["scrapes", 1],
  ["wounds", 2],
  ["injuries", 3],
  ["madness", 4],
]);

const healthTrackRollRange: Map<healthTrackKey, string> = new Map([
  ["bruises", "1–3"],
  ["scrapes", "4–6"],
  ["wounds", "7–9"],
  ["injuries", "10–12 / 13+"]
]);

const knowledgeSkills: Map<knowledgeSkillKey, string> = new Map([
  ['alchemyAndTransmutation', "BLOOD_AND_DOOM.knowledgeSkills.alchemyAndTransmutation"],
  ['archeologyAndArtifacts', "BLOOD_AND_DOOM.knowledgeSkills.archeologyAndArtifacts"],
  ['artAndAppraisal', "BLOOD_AND_DOOM.knowledgeSkills.artAndAppraisal"],
  ['artificeAndMechanisms', "BLOOD_AND_DOOM.knowledgeSkills.artificeAndMechanisms"],
  ['astrologyAndCosmology', "BLOOD_AND_DOOM.knowledgeSkills.astrologyAndCosmology"],
  ['cartographyAndMaps', "BLOOD_AND_DOOM.knowledgeSkills.cartographyAndMaps"],
  ['craftsAndRepair', "BLOOD_AND_DOOM.knowledgeSkills.craftsAndRepair"],
  ['diplomacyAndPolitics', "BLOOD_AND_DOOM.knowledgeSkills.diplomacyAndPolitics"],
  ['explorationAndWilderness', "BLOOD_AND_DOOM.knowledgeSkills.explorationAndWilderness"],
  ['herbalismAndHealing', "BLOOD_AND_DOOM.knowledgeSkills.herbalismAndHealing"],
  ['historyAndCulture', "BLOOD_AND_DOOM.knowledgeSkills.historyAndCulture"],
  ['justiceAndLaw', "BLOOD_AND_DOOM.knowledgeSkills.justiceAndLaw"],
  ['languageAndTranslation', "BLOOD_AND_DOOM.knowledgeSkills.languageAndTranslation"],
  ['mathAndScience', "BLOOD_AND_DOOM.knowledgeSkills.mathAndScience"],
  ['monstersAndMyth', "BLOOD_AND_DOOM.knowledgeSkills.monstersAndMyth"],
  ['natureAndAnimals', "BLOOD_AND_DOOM.knowledgeSkills.natureAndAnimals"],
  ['occultAndParanormal', "BLOOD_AND_DOOM.knowledgeSkills.occultAndParanormal"],
  ['organizationAndAdministration', "BLOOD_AND_DOOM.knowledgeSkills.organizationAndAdministration"],
  ['poisonAndDisease', "BLOOD_AND_DOOM.knowledgeSkills.poisonAndDisease"],
  ['religionAndSpiritualism', "BLOOD_AND_DOOM.knowledgeSkills.religionAndSpiritualism"],
  ['sailingAndShips', "BLOOD_AND_DOOM.knowledgeSkills.sailingAndShips"],
  ['sorceryAndMagic', "BLOOD_AND_DOOM.knowledgeSkills.sorceryAndMagic"],
  ['strategyAndWarfare', "BLOOD_AND_DOOM.knowledgeSkills.strategyAndWarfare"],
  ['thieveryAndCrime', "BLOOD_AND_DOOM.knowledgeSkills.thieveryAndCrime"]
]);

const proficiencyGroupLabels: Map<string, string> = new Map([
  ["proficiencies", "Proficiencies"],
  ["languages", "Languages"],
  ["feats", "Feats"],
  ["discoveredSpells", "Discovered Spells"]
])

const resolveTypes: Map<resolveKey, string> = new Map([
  ["toughness", "BLOOD_AND_DOOM.resolveTypes.toughness"],
  ["reflexes", "BLOOD_AND_DOOM.resolveTypes.reflexes"],
  ["focus", "BLOOD_AND_DOOM.resolveTypes.focus"],
  ["composure", "BLOOD_AND_DOOM.resolveTypes.composure"],
  ["willpower", "BLOOD_AND_DOOM.resolveTypes.willpower"],
]);

const skillGroupings: Map<abilityKey, skillKey[]> = new Map([
  ['strength', ["athletics", "heavyAttack", "unarmedAttack"]],
  ['dexterity', ["locksAndTraps", "rangedAttack", "sleightOfHand"]],
  ['agility', ["acrobatics", "finesseAttack", "stealth"]],
  ['awareness', ["navigation", "perception", "tracking"]],
  ['intellect', ["investigation", "reasonAndLogic", "studyAndWrite"]],
  ['wisdom', ["animalKen", "healing", "survival"]],
  ['heart', ["empathy", "insight", "persuasion"]],
  ['mystique', ["charm", "deception", "performance"]],
  ['presence', ["connect", "intimidation", "leadership"]],
]);

const skills: Map<skillKey, string> = new Map([
  ["acrobatics", "BLOOD_AND_DOOM.skills.acrobatics"],
  ["animalKen", "BLOOD_AND_DOOM.skills.animalKen"],
  ["athletics", "BLOOD_AND_DOOM.skills.athletics"],
  ["charm", "BLOOD_AND_DOOM.skills.charm"],
  ["connect", "BLOOD_AND_DOOM.skills.connect"],
  ["deception", "BLOOD_AND_DOOM.skills.deception"],
  ["empathy", "BLOOD_AND_DOOM.skills.empathy"],
  ["finesseAttack", "BLOOD_AND_DOOM.skills.finesseAttack"],
  ["healing", "BLOOD_AND_DOOM.skills.healing"],
  ["insight", "BLOOD_AND_DOOM.skills.insight"],
  ["intimidation", "BLOOD_AND_DOOM.skills.intimidation"],
  ["heavyAttack", "BLOOD_AND_DOOM.skills.heavyAttack"],
  ["investigation", "BLOOD_AND_DOOM.skills.investigation"],
  ["leadership", "BLOOD_AND_DOOM.skills.leadership"],
  ["locksAndTraps", "BLOOD_AND_DOOM.skills.locksAndTraps"],
  ["navigation", "BLOOD_AND_DOOM.skills.navigation"],
  ["perception", "BLOOD_AND_DOOM.skills.perception"],
  ["performance", "BLOOD_AND_DOOM.skills.performance"],
  ["persuasion", "BLOOD_AND_DOOM.skills.persuasion"],
  ["rangedAttack", "BLOOD_AND_DOOM.skills.rangedAttack"],
  ["reasonAndLogic", "BLOOD_AND_DOOM.skills.reasonAndLogic"],
  ["sleightOfHand", "BLOOD_AND_DOOM.skills.sleightOfHand"],
  ["stealth", "BLOOD_AND_DOOM.skills.stealth"],
  ["studyAndWrite", "BLOOD_AND_DOOM.skills.studyAndWrite"],
  ["survival", "BLOOD_AND_DOOM.skills.survival"],
  ["tracking", "BLOOD_AND_DOOM.skills.tracking"],
  ["unarmedAttack", "BLOOD_AND_DOOM.skills.unarmedAttack"],
]);

const traitHeadings = new Map([
  ["armor", "Armor"],
  ["other", "Other"],
  ["skills", "Skills"],
  ["special", "Special"],
  ["traits", "Traits"],
  ["weakness", "Weakness"],
  ["weapons", "Weapons"],
])

const PRELOCALIZED_KEYS = [
  "abilityCategories",
  "abilities",
  "bioEditorButtonLabels",
  "healthTracks",
  "healthTrackAbbreviations",
  "knowledgeSkills",
  "proficiencyGroupLabels",
  "resolveTypes",
  "skills",
  "traitHeadings"
];

const BLOOD_AND_DOOM = {
  abilities,
  abilityCategories,
  abilityGroupings,
  bioEditorButtonLabels,
  bioEditorButtonLabelsOrder,
  healthTracks,
  healthTrackAbbreviations,
  healthTrackMaximums,
  healthTrackOrder,
  healthTrackRollRange,
  knowledgeSkills,
  proficiencyGroupLabels,
  resolveTypes,
  skillGroupings,
  skills,
  traitHeadings,
  ...registerDocumentConfig(),
  DIFFICULTY_LEVELS,
  PRELOCALIZED_KEYS
};

export { BLOOD_AND_DOOM };
