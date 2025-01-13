<script>
    import { getContext } from "svelte";

    async function togglePowerImproved({ checked }, traditionKey, index) {
        const traditions = actor.reactive.system.traditions;
        const updatedPower = traditions[traditionKey].values[index];
        updatedPower.improved = checked;

        await actor.update({
            [`system.traditions.${traditionKey}.values`]: traditions[
                traditionKey
            ].values.with(index, updatedPower),
        });
    }

    async function updatePower({ value }, key, traditionKey, index) {
        const traditions = actor.reactive.system.traditions;
        const updatedPower = traditions[traditionKey].values[index];
        updatedPower[key] = value;

        await actor.update({
            [`system.traditions.${traditionKey}.values`]: traditions[
                traditionKey
            ].values.with(index, updatedPower),
        });
    }

    let actor = getContext("actor");
    let sheet = getContext("sheet");
</script>

<section class="bnd-powers-container bnd-box">
    <header class="bnd-powers-container__header">
        <h3 class="bnd-heading bnd-heading--section">Traits, Powers & Spells</h3>

        <label class="bnd-powers-container__resolve-field">
            Class Resolve Difficulty

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.classResolveDifficulty}
                onchange={({ target }) =>
                    actor.update({
                        "system.classResolveDifficulty": target.value,
                    })}
            />
        </label>
    </header>

    {#each Object.entries(actor.reactive.system.traditions) as [traditionKey, tradition], i}
        <section class="bnd-powers-container__tradition">
            <header>
                <input
                    class="bnd-powers-container__tradition-name bnd-sheet-input"
                    type="text"
                    value={tradition.name}
                    placeholder="Tradition {traditionKey.toUpperCase()}"
                    onchange={({ target }) =>
                        actor.update({
                            [`system.traditions.${traditionKey}.name`]: target.value,
                        })}
                />

                <small class="bnd-powers-container__tradition-levels">
                    Level {i * 4 + 1}&hyphen;{i * 4 + 4}
                </small>
            </header>

            <ul class="bnd-powers-list">
                {#each tradition.values as { improved, name, uses }, j}
                    <li class="bnd-power">
                        <input
                            class="bnd-sheet-input bnd-sheet-input--power-name"
                            type="text"
                            value={name}
                            onchange={({ target }) =>
                                updatePower(target, "name", traditionKey, j)}
                        />

                        <input
                            class="bnd-sheet-input bnd-sheet-input--power-uses"
                            type="text"
                            value={uses}
                            onchange={({ target }) =>
                                updatePower(target, "uses", traditionKey, j)}
                        />

                        <input
                            class="bnd-power__checkbox"
                            type="checkbox"
                            checked={improved}
                            onchange={({ target }) =>
                                togglePowerImproved(target, traditionKey, j)}
                        />
                    </li>
                {/each}
            </ul>
        </section>
    {/each}
</section>
