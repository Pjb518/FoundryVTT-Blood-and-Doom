<script>
    import { getContext } from "svelte";

    function getTrainedKnowledgeSkills(actor) {
        return Object.entries(actor.reactive.system.skills.knowledge)
            .filter(([, skill]) => skill.trained)
            .toSorted(([a], [b]) => {
                let firstSkill = knowledgeSkills.get(a);
                let secondSkill = knowledgeSkills.get(b);

                return firstSkill.localeCompare(secondSkill);
            });
    }

    const { knowledgeSkills } = CONFIG.BLOOD_AND_DOOM;

    let actor = getContext("actor");
    let trainedKnowledgeSkills = $derived(getTrainedKnowledgeSkills(actor));
</script>

<section class="bnd-knowledge-container bnd-box">
    <header class="bnd-knowledge-container__header">
        <h3 class="bnd-heading bnd-heading--section bnd-knowledge-container__heading">
            Knowledge

            <button
                class="bnd-knowledge-container__config-button"
                type="button"
                aria-label="Configure knowledge skills"
                data-tooltip="Configure knowledge skills"
                onclick={() => actor.reactive.configureKnowledgeSkills()}
            >
                <i class="fa-solid fa-gear"></i>
            </button>
        </h3>

        <div class="bnd-ability-group__header bnd-ability-group__header--mind">
            <h4
                class="bnd-heading bnd-heading--ability bnd-heading--mind bnd-heading--small bnd-heading--uppercase"
            >
                Basic Knowledge
            </h4>

            <div class="bnd-ability-group__input">
                {actor.reactive.system.abilities.mind ?? 0}
            </div>
        </div>
    </header>

    <ul class="bnd-knowledge-container__skill-list">
        {#each trainedKnowledgeSkills as [key, skill]}
            {@const skillLabel = knowledgeSkills.get(key)}

            <li class="bnd-u-display-contents">
                <label class="bnd-knowledge-container__skill-wrapper">
                    <h5 class="bnd-heading bnd-knowledge-container__skill-name">
                        {skillLabel}
                    </h5>

                    <input
                        class="bnd-sheet-input"
                        type="number"
                        value={skill.rank}
                        onchange={({ target }) => {
                            actor.update({
                                [`system.skills.knowledge.${key}.rank`]: target.value,
                            });
                        }}
                    />
                </label>
            </li>
        {:else}
            <button
                class="bnd-knowledge-container__add-button"
                type="button"
                aria-label="Open knowledge skill config"
                onclick={() => actor.configureKnowledgeSkills()}
            >
                + Add skills
            </button>
        {/each}
    </ul>
</section>
