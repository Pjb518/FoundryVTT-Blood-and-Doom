<script>
    import { getContext } from "svelte";

    let actor = getContext("actor");
    let sheet = getContext("sheet");
</script>

<section class="bnd-magic-container bnd-box">
    <header class="bnd-magic-container__header">
        <h3 class="bnd-heading bnd-heading--section">Magic</h3>
    </header>

    <div class="bnd-magic-container__spellcasting">
        <h4 class="bnd-heading bnd-heading--magic" style="grid-area: heading;">
            Spellcasting
        </h4>

        <label class="bnd-magic-container__score-wrapper" style="grid-area: ability;">
            <h5 class="bnd-heading bnd-heading--magic-subheading">Ability</h5>

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.magic.ability}
                onchange={({ target }) => {
                    actor.update({
                        "system.magic.ability": target.value,
                    });
                }}
            />
        </label>

        <label class="bnd-magic-container__score-wrapper" style="grid-area: skill;">
            <h5 class="bnd-heading bnd-heading--magic-subheading">Skill</h5>

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.magic.skill}
                onchange={({ target }) => {
                    actor.update({
                        "system.magic.skill": target.value,
                    });
                }}
            />
        </label>

        <label class="bnd-magic-container__score-wrapper" style="grid-area: total;">
            <h5 class="bnd-heading bnd-heading--magic-subheading">Total</h5>

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.magic.total}
                disabled
            />
        </label>
    </div>

    <div class="bnd-magic-container__magic-points">
        <h4 class="bnd-heading bnd-heading--magic-points">Magic Points</h4>

        <div class="bnd-magic-container__magic-points-wrapper">
            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.magic.points.value}
                onchange={({ target }) => {
                    actor.update({
                        "system.magic.points.value": target.value,
                    });
                }}
            />

            <button
                class="bnd-ammunition-decrement-button"
                type="button"
                aria-label="Decrement Magic Points"
                data-tooltip="Decrement Magic Points"
                disabled={actor.reactive.system.magic.points.value === 0}
                onclick={() =>
                    actor.update({
                        "system.magic.points.value": Math.max(
                            actor.reactive.system.magic.points.value - 1,
                            0,
                        ),
                    })}
            >
                <i class="fa-solid fa-square-caret-down"></i>
            </button>

            <h5 class="bnd-heading bnd-heading--magic-subheading">Max</h5>

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.magic.points.max}
                onchange={({ target }) => {
                    actor.update({
                        "system.magic.points.max": target.value,
                    });
                }}
            />
        </div>
    </div>
</section>
