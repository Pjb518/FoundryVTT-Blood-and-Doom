<script>
    import PipGroup from "#view/components/PipGroup.svelte";

    const {} = CONFIG.BLOOD_AND_DOOM;

    let { actor, dialog } = $props();

    let currentDents = $derived(actor.reactive.system.armor.dents.value);
    let maxDents = $derived(actor.reactive.system.armor.dents.max);
</script>

<section class="bnd-sheet__body bnd-sheet__body--armor-config-dialog">
    <section class="bnd-box bnd-box--padded bnd-armor-config-field-group">
        <header class="bnd-armor-config-field-group__header">
            <h2 class="bnd-heading bnd-armor-config-field-group__label">Dents</h2>

            <PipGroup
                flex={true}
                disabled={true}
                ghostPips={5 - maxDents}
                markedPips={currentDents}
                pipCount={maxDents}
            />
        </header>

        <div class="bnd-armor-config-field-group__row">
            <label class="bnd-armor-config-field-group__field">
                Current

                <input
                    class="bnd-sheet-input"
                    type="number"
                    value={actor.reactive.system.armor.dents.value}
                    min="0"
                    max={actor.reactive.system.armor.dents.max}
                    onchange={({ target }) =>
                        actor.update({
                            "system.armor.dents.value": target.value,
                        })}
                />
            </label>

            <label class="bnd-armor-config-field-group__field">
                Max

                <input
                    class="bnd-sheet-input"
                    type="number"
                    value={actor.reactive.system.armor.dents.max}
                    min="1"
                    max="5"
                    onchange={({ target }) =>
                        actor.update({
                            "system.armor.dents.max": target.value,
                        })}
                />
            </label>
        </div>
    </section>
</section>
