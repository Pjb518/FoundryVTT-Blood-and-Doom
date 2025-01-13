<script>
    import { getContext } from "svelte";

    let actor = getContext("actor");
    let sheet = getContext("sheet");
</script>

<section class="bnd-defenses-container bnd-box">
    <section class="bnd-evasion-container">
        <header class="bnd-evasion-container__header">
            <h3 class="bnd-heading bnd-heading--section">Evasion</h3>
        </header>

        <label class="bnd-u-display-contents">
            <h4
                class="bnd-evasion-container__label bnd-evasion-container__label--score bnd-heading"
            >
                Score
            </h4>

            <input
                class="bnd-sheet-input"
                style="grid-area: scoreInput;"
                type="number"
                value={actor.reactive.system.evasion.score}
                onchange={({ target }) =>
                    actor.update({
                        "system.evasion.score": target.value,
                    })}
            />
        </label>

        <label class="bnd-u-display-contents">
            <h4
                class="bnd-evasion-container__label bnd-evasion-container__label--average bnd-heading"
            >
                Average
            </h4>

            <span class="bnd-evasion-container__divider"> / </span>

            <input
                class="bnd-sheet-input"
                style="grid-area: averageInput;"
                type="number"
                value={actor.reactive.system.evasion.average}
                onchange={({ target }) =>
                    actor.update({
                        "system.evasion.average": target.value,
                    })}
            />
        </label>
    </section>

    <section class="bnd-armor-container">
        <header class="bnd-armor-container__header">
            <h3 class="bnd-heading bnd-heading--section">Armor</h3>
        </header>

        <label class="bnd-armor-container__row">
            <i class="bnd-armor-container__icon fa-solid fa-shield"></i>

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.armor.armored}
                onchange={({ target }) => {
                    actor.update({ "system.armor.armored": target.value });
                }}
            />
        </label>

        <label class="bnd-armor-container__row">
            <i
                class="bnd-armor-container__icon bnd-armor-container__icon--unarmored fa-solid fa-shield"
            ></i>

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.armor.unarmored}
                onchange={({ target }) => {
                    actor.update({ "system.armor.unarmored": target.value });
                }}
            />
        </label>
    </section>
</section>
