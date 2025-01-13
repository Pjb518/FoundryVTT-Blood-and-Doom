<script>
    import { getContext } from "svelte";
    import GenericDialog from "../../../documents/dialogs/GenericDialog.svelte.ts";
    import PipGroup from "#view/components/PipGroup.svelte";
    import HealthConfigDialog from "#view/dialogs/HealthConfigDialog.svelte";

    async function configureHealth() {
        const dialogTitle = `${actor.reactive.name}: Configure Health`;

        const dialog = new GenericDialog(
            dialogTitle,
            HealthConfigDialog,
            { actor },
            { icon: "fa-solid fa-heart" },
        );

        dialog.render(true);
    }

    async function updateCondition({ value }, key, index) {
        const conditions = actor.reactive.system.conditions;
        const updatedCondition = conditions[index];
        updatedCondition[key] = value;

        await actor.update({
            [`system.conditions`]: conditions.with(index, updateCondition),
        });
    }

    async function updateHealthTrack(key, newValue) {
        let updateValue = newValue;
        let currentValue = actor.reactive.system.health[key].value;

        if (currentValue >= newValue) updateValue -= 1;

        actor.update({
            [`system.health.${key}.value`]: updateValue,
        });
    }

    const { healthTracks, healthTrackMaximums, healthTrackRollRange } =
        CONFIG.BLOOD_AND_DOOM;

    let actor = getContext("actor");
    let sheet = getContext("sheet");
</script>

<section class="bnd-health-container bnd-box">
    <header class="bnd-health-container__header">
        <h3 class="bnd-health-container__heading bnd-heading bnd-heading--section">
            Health

            <button
                class="bnd-health-container__config-button"
                type="button"
                aria-label="Configure Health"
                data-tooltip="Configure Health"
                onclick={configureHealth}
            >
                <i class="fa-solid fa-gear"></i>
            </button>
        </h3>

        <button
            class="bnd-health-container__rest-button"
            type="button"
            aria-label="Begin Rest"
            data-tooltip="Begin Rest"
            onclick={() => actor.triggerLongRest()}
        >
            Long Rest
        </button>
    </header>

    {#each Object.entries(actor.reactive.system.health) as [key, track]}
        {@const trackMaximum = healthTrackMaximums.get(key) ?? 3}
        {@const current = track.value}
        {@const max = track.max}
        {@const ghostPips = trackMaximum - max}
        {@const rollRange = healthTrackRollRange.get(key)}

        <div class="bnd-health-track" style="grid-area: {key};">
            <h4 class="bnd-heading bnd-heading--small bnd-health-track__label">
                {healthTracks.get(key)}

                {#if rollRange}
                    <span class="bnd-health-track__roll-range">
                        ({rollRange})
                    </span>
                {/if}
            </h4>

            <PipGroup
                flex={key === "madness"}
                {ghostPips}
                markedPips={current}
                pipCount={max}
                pipJustification={key === "madness" ? "space-between" : "start"}
                onSelectPip={(value) => updateHealthTrack(key, value)}
            />
        </div>
    {/each}

    <section class="bnd-conditions">
        <header class="bnd-conditions__header">
            <h4 class="bnd-heading">Conditions & Afflictions</h4>
        </header>

        <header class="bnd-conditions__header">
            <h4 class="bnd-heading">Treatment</h4>
        </header>

        <ul style="display: contents;">
            {#each actor.reactive.system.conditions as { value, treatment }, index}
                <li style="display: contents;">
                    <input
                        class="bnd-sheet-input"
                        type="text"
                        {value}
                        onchange={({ target }) => {
                            updateCondition(target, "value", index);
                        }}
                    />

                    <input
                        class="bnd-sheet-input"
                        type="text"
                        value={treatment}
                        onchange={({ target }) => {
                            updateCondition(target, "treatment", index);
                        }}
                    />
                </li>
            {/each}
        </ul>
    </section>
</section>
