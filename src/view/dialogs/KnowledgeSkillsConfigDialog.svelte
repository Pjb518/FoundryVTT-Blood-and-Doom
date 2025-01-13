<script>
    import { getContext } from "svelte";

    const { knowledgeSkills } = CONFIG.BLOOD_AND_DOOM;

    let { document } = $props();
</script>

<section class="bnd-sheet__body bnd-sheet__body--knowledge-skills-config">
    <div class="bnd-box bnd-box--padded">
        <ul class="knowledge-skill-list">
            {#each knowledgeSkills as [key, label]}
                <li class="knowledge-skill-list__item">
                    <label class="bnd-u-display-contents">
                        <input
                            type="checkbox"
                            checked={document.reactive.system.skills.knowledge[key]
                                .trained}
                            onchange={({ target }) => {
                                document.update({
                                    [`system.skills.knowledge.${key}.trained`]:
                                        target.checked,
                                });
                            }}
                        />

                        <span class="knowledge-skill-list__label">{label}</span>
                    </label>

                    <input
                        class="bnd-sheet-input"
                        type="number"
                        value={document.reactive.system.skills.knowledge[key].rank}
                        onchange={({ target }) => {
                            document.update({
                                [`system.skills.knowledge.${key}.rank`]: target.value,
                            });
                        }}
                    />
                </li>
            {/each}
        </ul>
    </div>
</section>
