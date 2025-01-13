<script>
    import { getContext } from "svelte";

    const { abilities, abilityCategories, abilityGroupings, skillGroupings, skills } =
        CONFIG.BLOOD_AND_DOOM;

    let actor = getContext("actor");
</script>

<section class="bnd-skills-container bnd-box">
    <header class="bnd-skills-container__header">
        <h3 class="bnd-heading bnd-heading--section">Abilities & Skills</h3>
    </header>

    {#each abilityCategories as [key, heading] (key)}
        <h4 class="bnd-heading bnd-heading--ability-category">
            {heading}
        </h4>

        {#each abilityGroupings.get(key) as abilityKey (abilityKey)}
            {@const abilityScore = actor.reactive.system.abilities[abilityKey]}
            {@const abilityHeading = abilities.get(abilityKey)}

            <section class="bnd-ability-group">
                <header class="bnd-ability-group__header">
                    <h5
                        class="bnd-heading bnd-heading--ability bnd-heading--small bnd-heading--uppercase"
                    >
                        {abilityHeading}
                    </h5>

                    <input
                        class="bnd-ability-group__input"
                        type="number"
                        value={abilityScore}
                        onchange={({ target }) =>
                            actor.update({
                                [`system.abilities.${abilityKey}`]: target.value,
                            })}
                    />
                </header>

                {#each skillGroupings.get(abilityKey) as skillKey (skillKey)}
                    {@const skillRank = actor.reactive.system.skills.base[skillKey]}
                    {@const skillLabel = skills.get(skillKey)}

                    <label class="bnd-skill">
                        <h6 class="bnd-skill__label">{skillLabel}</h6>

                        <input
                            class="bnd-sheet-input"
                            type="number"
                            value={skillRank}
                            onchange={({ target }) =>
                                actor.update({
                                    [`system.skills.base.${skillKey}`]: target.value,
                                })}
                        />
                    </label>
                {/each}
            </section>
        {/each}
    {/each}
</section>
