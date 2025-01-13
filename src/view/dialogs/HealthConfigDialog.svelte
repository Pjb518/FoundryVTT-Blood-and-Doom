<script>
    import PipGroup from "#view/components/PipGroup.svelte";

    const { healthTracks, healthTrackMaximums, healthTrackOrder } = CONFIG.BLOOD_AND_DOOM;

    let { actor, dialog } = $props();
</script>

<section class="bnd-sheet__body bnd-sheet__body--health-config-dialog">
    {#each Object.entries(actor.reactive.system.health).toSorted(([a], [b]) => healthTrackOrder.get(a) - healthTrackOrder.get(b)) as [key, track]}
        {@const label = healthTracks.get(key)}
        {@const trackMaximum =
            actor.type === "character" ? healthTrackMaximums.get(key) : 6}
        {@const current = track.value}
        {@const max = track.max}
        {@const ghostPips = trackMaximum - max}

        <section class="bnd-box bnd-box--padded bnd-health-config-field-group">
            <header class="bnd-health-config-field-group__header">
                <h2 class="bnd-heading bnd-health-config-field-group__label">{label}</h2>

                <PipGroup
                    disabled={true}
                    flex={true}
                    {ghostPips}
                    markedPips={current}
                    pipCount={max}
                />
            </header>

            <label class="bnd-health-config-field-group__field">
                Current

                <input
                    class="bnd-sheet-input"
                    type="number"
                    min="0"
                    {max}
                    value={current}
                    onchange={({ target }) =>
                        actor.update({
                            [`system.health.${key}.value`]: target.value,
                        })}
                />
            </label>

            <label class="bnd-health-config-field-group__field">
                Max

                <input
                    class="bnd-sheet-input"
                    type="number"
                    min="1"
                    max={trackMaximum}
                    value={max}
                    onchange={({ target }) =>
                        actor.update({
                            [`system.health.${key}.max`]: target.value,
                        })}
                />
            </label>
        </section>
    {/each}
</section>
