<script>
    import { getContext } from "svelte";
    import PipGroup from "#view/components/PipGroup.svelte";

    function updateLevelUpSelection(group, key, value) {
        let updateValue = value;

        if (actor.reactive.system.advancement?.[group]?.[key] >= value) updateValue -= 1;

        actor.update({
            [`system.advancement.${group}.${key}`]: updateValue,
        });
    }

    let actor = getContext("actor");
    let sheet = getContext("sheet");
</script>

<section class="bnd-sheet__body bnd-sheet__body--player-character-page-3">
    <section class="bnd-level-up-log bnd-box bnd-box--padded" style="grid-area: low;">
        <header class="bnd-level-up-log__header">
            <h2 class="bnd-heading bnd-heading--section">Level 2–4 Advancement</h2>

            <p>
                At level 2, 3, and 4, choose two different unmarked advancement options
                and mark them, gaining their benefits.
            </p>
        </header>

        <dl class="bnd-level-up-log-list">
            <dt class="bnd-level-up-log-list__category">
                Gain 1 Trait, Power, or Spell.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="2"
                    markedPips={actor.reactive.system.advancement.firstGroup.gainTrait}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("firstGroup", "gainTrait", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Improve 1 Trait or 1 Power/1 Spell.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="2"
                    markedPips={actor.reactive.system.advancement.firstGroup.improveTrait}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("firstGroup", "improveTrait", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Increase Skill Ranks.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="2"
                    markedPips={actor.reactive.system.advancement.firstGroup
                        .increaseSkillRank}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("firstGroup", "increaseSkillRank", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Gain Damage Boxes.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.firstGroup
                        .gainDamageBoxes}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("firstGroup", "gainDamageBoxes", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Gain Madness Boxes.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.firstGroup
                        .gainMadnessBoxes}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("firstGroup", "gainMadnessBoxes", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Gain 1 Class Feat or 1 Common Feat.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.firstGroup.gainFeat}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("firstGroup", "gainFeat", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Learn 2 Common or 1 Ancient Language.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.firstGroup
                        .gainLanguages}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("firstGroup", "gainLanguages", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Learn 2 Knowledge Skills at Rank 1.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.firstGroup
                        .gainKnowledgeSkills}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "firstGroup",
                            "gainKnowledgeSkills",
                            value,
                        )}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Gain Proficiencies.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.firstGroup
                        .gainProficiencies}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("firstGroup", "gainProficiencies", value)}
                />
            </dd>
        </dl>
    </section>

    <section class="bnd-level-up-log bnd-box bnd-box--padded" style="grid-area: medium">
        <header class="bnd-level-up-log__header">
            <h2 class="bnd-heading bnd-heading--section">Level 5–8 Advancement</h2>

            <p>
                At level 5, choose one of your Class's Traditions to follow and gain 1
                Trait and 1 Power/1 Spell available from it. Your Class Resolve Difficulty
                is now increased by 1. Also at level 5, and again at level 6, 7, and 8,
                choose two different unmarked advancement options and mark them, gaining
                their benefits.
            </p>
        </header>

        <dl class="bnd-level-up-log-list">
            <dt class="bnd-level-up-log-list__category">
                Gain 1 Trait, Power, or Spell.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="2"
                    markedPips={actor.reactive.system.advancement.secondGroup.gainTrait}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("secondGroup", "gainTrait", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Improve 1 Trait or 1 Power/1 Spell.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="2"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .improveTrait}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("secondGroup", "improveTrait", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Increase Skill Ranks.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="2"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .increaseSkillRank}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("secondGroup", "increaseSkillRank", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Gain Damage Boxes.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .gainDamageBoxes}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("secondGroup", "gainDamageBoxes", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Gain Madness Boxes.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .gainMadnessBoxes}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("secondGroup", "gainMadnessBoxes", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Gain 1 Class Feat or 1 Common Feat.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.secondGroup.gainFeat}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("secondGroup", "gainFeat", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Increase Evasion Score by 1.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .increaseEvasionScore}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "secondGroup",
                            "increaseEvasionScore",
                            value,
                        )}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Increase 2 Resolve Scores by 1.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .increaseResolveScores}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "secondGroup",
                            "increaseResolveScores",
                            value,
                        )}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Increase Combat Resolve Difficulty by 1.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .increaseCombatResolveDifficulty}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "secondGroup",
                            "increaseCombatResolveDifficulty",
                            value,
                        )}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Learn 2 Common or 1 Ancient Language.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .gainLanguages}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("secondGroup", "gainLanguages", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Learn 2 Knowledge Skills at Rank 1.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .gainKnowledgeSkills}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "secondGroup",
                            "gainKnowledgeSkills",
                            value,
                        )}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Gain Proficiencies.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .gainProficiencies}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("secondGroup", "gainProficiencies", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Increase Ability Scores.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.secondGroup
                        .increaseAbilityScores}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "secondGroup",
                            "increaseAbilityScores",
                            value,
                        )}
                />
            </dd>
        </dl>
    </section>

    <section class="bnd-level-up-log bnd-box bnd-box--padded" style="grid-area: high;">
        <header class="bnd-level-up-log__header">
            <h2 class="bnd-heading bnd-heading--section">Level 9–12 Advancement</h2>

            <p>
                At level 9, choose one of your Class's Traditions to follow and gain 1
                Trait and 1 Power/1 Spell available from it. Your Class Resolve Difficulty
                is now increased by 1. Also at level 9, and again at level 10, 11, and 12,
                choose two different unmarked advancement options and mark them, gaining
                their benefits.
            </p>
        </header>

        <dl class="bnd-level-up-log-list">
            <dt class="bnd-level-up-log-list__category">
                Gain 1 Trait, Power, or Spell.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="2"
                    markedPips={actor.reactive.system.advancement.thirdGroup.gainTrait}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("thirdGroup", "gainTrait", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Improve 1 Trait or 1 Power/1 Spell.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="2"
                    markedPips={actor.reactive.system.advancement.thirdGroup.improveTrait}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("thirdGroup", "improveTrait", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Increase Skill Ranks.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="2"
                    markedPips={actor.reactive.system.advancement.thirdGroup
                        .increaseSkillRank}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("thirdGroup", "increaseSkillRank", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Gain Damage Boxes.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.thirdGroup
                        .gainDamageBoxes}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("thirdGroup", "gainDamageBoxes", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Gain Madness Boxes.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.thirdGroup
                        .gainMadnessBoxes}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("thirdGroup", "gainMadnessBoxes", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Gain 1 Class Feat or 1 Common Feat.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.thirdGroup.gainFeat}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("thirdGroup", "gainFeat", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Increase Evasion Score by 1.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.thirdGroup
                        .increaseEvasionScore}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "thirdGroup",
                            "increaseEvasionScore",
                            value,
                        )}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Increase 2 Resolve Scores by 1.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.thirdGroup
                        .increaseResolveScores}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "thirdGroup",
                            "increaseResolveScores",
                            value,
                        )}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Increase Combat Resolve Difficulty by 1.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.thirdGroup
                        .increaseCombatResolveDifficulty}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "thirdGroup",
                            "increaseCombatResolveDifficulty",
                            value,
                        )}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Learn 2 Common or 1 Ancient Language.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.thirdGroup
                        .gainLanguages}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("thirdGroup", "gainLanguages", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">
                Learn 2 Knowledge Skills at Rank 1.
            </dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.thirdGroup
                        .gainKnowledgeSkills}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "thirdGroup",
                            "gainKnowledgeSkills",
                            value,
                        )}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Gain Proficiencies.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.thirdGroup
                        .gainProficiencies}
                    onSelectPip={(value) =>
                        updateLevelUpSelection("thirdGroup", "gainProficiencies", value)}
                />
            </dd>

            <dt class="bnd-level-up-log-list__category">Increase Ability Scores.</dt>

            <dd class="bnd-level-up-log-list__selections">
                <PipGroup
                    flex={true}
                    pipCount="1"
                    markedPips={actor.reactive.system.advancement.thirdGroup
                        .increaseAbilityScores}
                    onSelectPip={(value) =>
                        updateLevelUpSelection(
                            "thirdGroup",
                            "increaseAbilityScores",
                            value,
                        )}
                />
            </dd>
        </dl>
    </section>

    <section class="bnd-box bnd-box--padded" style="grid-area: level">
        <label class="bnd-level">
            <h2 class="bnd-heading">Level</h2>

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.level}
                onchange={({ target }) =>
                    actor.update({
                        "system.level": target.value,
                    })}
            />
        </label>
    </section>

    <section class="bnd-box bnd-box--padded" style="grid-area: xp">
        <label class="bnd-xp">
            <h2 class="bnd-heading">XP</h2>

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.xp}
                onchange={({ target }) =>
                    actor.update({
                        "system.xp": target.value,
                    })}
            />
        </label>
    </section>

    <section class="bnd-level-up-guidance bnd-box bnd-box--padded">
        <ul class="bnd-level-up-guidance-list">
            <li class="bnd-level-up-guidance-list__item">
                <h2 class="bnd-heading bnd-heading--section">
                    Gaining Traits, Powers, and Spells
                </h2>

                <p>
                    Traits, Power, and Spells gained must be chosen from the Tradition you
                    are following at the time. Spells discovered and learned during
                    adventuring do not count towards those chosen and gained when leveling
                    up.
                </p>
            </li>

            <li class="bnd-level-up-guidance-list__item">
                <h2 class="bnd-heading bnd-heading--section">
                    Improving Traits, Powers, and Spells
                </h2>

                <p>
                    You can only improve a Trait, Power, or Spell you already had before
                    leveling up. It can be a Trait, Power, or Spell belonging to any
                    Tradition you have followed or are currently following.
                </p>
            </li>

            <li class="bnd-level-up-guidance-list__item">
                <h2 class="bnd-heading bnd-heading--section">Increasing Skill Ranks</h2>

                <p>
                    Gain 6 points to increase Skill Ranks of your choice, including your
                    Knowledge Skills and Spellcasting Skill. Every point spent increases a
                    rank by 1. No Skill Rank may be greater than 3 between Level 1–4,
                    greater than 4 between Level 5–8, or greater than 5 between Level
                    9–12, not considering increases resulting from magic items or
                    temporary (magical) effects.
                </p>
            </li>

            <li class="bnd-level-up-guidance-list__item">
                <h2 class="bnd-heading bnd-heading--section">Gaining Damage Boxes</h2>

                <p>Choose one of the following options:</p>

                <ul>
                    <li>Gain 1 Bruises and 1 Scrapes box.</li>

                    <li>
                        Gain 1 Wounds box if you already have all 3 Bruises and Scrapes
                        boxes.
                    </li>

                    <li>Gain 1 Injuries box if you already have all 3 Wounds boxes.</li>
                </ul>

                <p>
                    Boxes are grained from left to right, and you cannot have more than
                    three of each type.
                </p>
            </li>

            <li class="bnd-level-up-guidance-list__item">
                <h2 class="bnd-heading bnd-heading--section">Gaining Madness Boxes</h2>

                <p>
                    Gain up to 2 Madness boxes. Boxes are gained from left to right, and
                    you cannot have more than ten.
                </p>
            </li>

            <li class="bnd-level-up-guidance-list__item">
                <h2 class="bnd-heading bnd-heading--section">Gaining Proficiencies</h2>

                <p>Gain proficiency in either:</p>

                <ul>
                    <li>One weapon category of your choice.</li>

                    <li>
                        Large shields, or great shields if you already have proficiency
                        with large shields.
                    </li>

                    <li>Two tools, kits, or instruments (or a combination thereof).</li>

                    <li>
                        One armor category. This requires selecting this option twice
                        before you actually gain the proficiency. You also need
                        proficiency with simple armor to be able to choose proficiency
                        with medium armor, and proficiency with medium armor to be able to
                        choose proficiency with complex armor.
                    </li>
                </ul>
            </li>

            <li class="bnd-level-up-guidance-list__item">
                <h2 class="bnd-heading bnd-heading--section">
                    Increasing Ability Scores
                </h2>

                <p>
                    Increase 1 Ability Score of your choice by 1 in each category Body,
                    Mind, and Soul, for a total of 3 increases. Then, increase any Ability
                    of your choice with an Ability Score of 1 or 2 by 1 as well,
                    regardless of its category.
                </p>
            </li>

            <li class="bnd-level-up-guidance-list__item">
                <h2 class="bnd-heading bnd-heading--section">Choosing Traditions</h2>

                <p>
                    When choosing a Tradition to follow at level 5 and 8, you may choose
                    any previously chosen Tradition again or choose a different one
                    belonging to your Class. Some Traits, Powers, and Spells are only
                    unlocked once you have chosen the Tradition they are part of more than
                    once.
                </p>
            </li>
        </ul>
    </section>
</section>
