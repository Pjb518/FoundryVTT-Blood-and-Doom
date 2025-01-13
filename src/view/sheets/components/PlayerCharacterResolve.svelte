<script>
    import { getContext } from "svelte";

    const { resolveTypes } = CONFIG.BLOOD_AND_DOOM;

    let actor = getContext("actor");
    let sheet = getContext("sheet");
</script>

<section class="bnd-resolve-container bnd-box">
    <header>
        <h3 class="bnd-heading bnd-heading--section">Resolve</h3>
    </header>

    {#each resolveTypes as [key, label] (key)}
        {@const rollPrompt = `BLOOD_AND_DOOM.prompts.makeResolveRoll.${key}`}

        <label class="bnd-resolve">
            <h6 class="bnd-resolve__label">{label}</h6>

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.resolve[key]}
                onchange={({ target }) =>
                    actor.update({
                        [`system.resolve.${key}`]: target.value,
                    })}
            />
        </label>
    {/each}
</section>
