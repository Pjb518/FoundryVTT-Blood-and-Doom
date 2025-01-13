<script>
    import PipGroup from "../../components/PipGroup.svelte";

    function deleteCombatant(event) {
        event.preventDefault();
        combatant.delete();
    }

    async function handleTokenHighlight(event, mode) {
        event.preventDefault();

        const token = combatant.token?.object;

        if (!token || !token.isVisible || token.controlled) return;

        if (mode === "enter") {
            token._onHoverIn(event, { hoverOutOthers: true });
        } else {
            token._onHoverOut(event);
        }
    }

    async function panToCombatant(event) {
        event.preventDefault();

        if (!combatant.actor?.testUserPermission(game.user, "OBSERVER")) return;

        const token = combatant.token?.object;
        token?.control({ releaseOthers: true });

        return canvas.animatePan(token?.center);
    }

    async function toggleCombatantDefeatedState(event) {
        event.preventDefault();

        combatant.update({ defeated: !combatant.reactive.defeated });

        const defeatedId = CONFIG.specialStatusEffects.DEFEATED;

        await combatant.actor?.toggleStatusEffect(defeatedId, {
            overlay: true,
            active: !combatant.reactive.defeated,
        });
    }

    function toggleCombatantVisibility(event) {
        event.preventDefault();
        combatant.update({ hidden: !combatant.hidden });
    }

    async function updateHealthTrack(track, newValue) {
        let updateValue = newValue;
        let currentValue = combatant.actor.reactive.system.health[track].value;

        if (currentValue >= newValue) updateValue -= 1;

        combatant.actor.update({
            [`system.health.${track}.value`]: updateValue,
        });
    }

    let { combatant } = $props();

    let isOwner = combatant?.actor?.testUserPermission(game.user, "OWNER");
    let isObserver = combatant?.actor?.testUserPermission(game.user, "OBSERVER");
</script>

<article
    class="bnd-combatant"
    onmouseenter={(event) => handleTokenHighlight(event, "enter")}
    onmouseleave={(event) => handleTokenHighlight(event, "leave")}
>
    <header
        class="bnd-combatant__header"
        class:bnd-combatant__header--limited={!isObserver}
    >
        <label
            class="bnd-combatant__heading"
            class:bnd-combatant__heading--defeated={combatant.reactive.defeated}
        >
            {#if isOwner}
                <input
                    class="bnd-combatant__turn-marker"
                    type="checkbox"
                    aria-label="Combatant's Turn Completed?"
                    data-tooltip="Combatant's Turn Completed?"
                    disabled={combatant.reactive.defeated}
                    checked={combatant.reactive.system.turnTaken}
                    onchange={({ target }) =>
                        combatant.update({ "system.turnTaken": target.checked })}
                />
            {/if}

            {combatant.reactive.name}
        </label>

        <div class="bnd-combatant__header-buttons">
            {#if isObserver}
                <button
                    class="bnd-combatant__header-button"
                    type="button"
                    aria-label="Open Combatant Sheet"
                    data-tooltip="Open Combatant Sheet"
                    onclick={() => combatant.actor.sheet.render(true)}
                >
                    <i class="fa-solid fa-file-lines"></i>
                </button>
            {/if}

            {#if isOwner}
                <button
                    class="bnd-combatant__header-button"
                    class:bnd-combatant__header-button--active={combatant.reactive.hidden}
                    type="button"
                    aria-label="Toggle Combatant Visbility"
                    data-tooltip="Toggle Combatant Visbility"
                    onclick={toggleCombatantVisibility}
                >
                    <i class="fa-solid fa-eye-slash"></i>
                </button>
            {/if}

            {#if isObserver}
                <button
                    class="bnd-combatant__header-button"
                    type="button"
                    aria-label="Pan to Combatant"
                    data-tooltip="Pan to Combatant"
                    onclick={panToCombatant}
                >
                    <i class="fa-solid fa-search"></i>
                </button>
            {/if}

            {#if isOwner || combatant.reactive.defeated}
                <button
                    class="bnd-combatant__header-button"
                    class:bnd-combatant__header-button--active={combatant.reactive
                        .defeated}
                    type="button"
                    aria-label="Toggle Combatant Defeated State"
                    data-tooltip="Toggle Combatant Defeated State"
                    onclick={toggleCombatantDefeatedState}
                    disabled={!isOwner}
                >
                    <i class="fa-solid fa-skull"></i>
                </button>
            {/if}

            {#if isOwner}
                <button
                    class="bnd-combatant__header-button"
                    type="button"
                    aria-label="Delete Combatant"
                    data-tooltip="Delete Combatant"
                    onclick={deleteCombatant}
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            {/if}
        </div>
    </header>

    {#if isObserver}
        <dl class="bnd-combatant__health-wrapper">
            <div class="bnd-combatant-health-field">
                <dt class="bnd-combatant-health-field__label">Bruises (1&hyphen;3)</dt>

                <dd class="bnd-combatant-health-field__pips">
                    <PipGroup
                        flex={true}
                        disabled={!isOwner}
                        markedPips={combatant.actor.reactive.system.health.bruises.value}
                        pipCount={combatant.actor.reactive.system.health.bruises.max}
                        onSelectPip={(newValue) => updateHealthTrack("bruises", newValue)}
                    />
                </dd>
            </div>

            <div class="bnd-combatant-health-field">
                <dt class="bnd-combatant-health-field__label">Scrapes (4&hyphen;6)</dt>

                <dd class="bnd-combatant-health-field__pips">
                    <PipGroup
                        flex={true}
                        disabled={!isOwner}
                        markedPips={combatant.actor.reactive.system.health.scrapes.value}
                        pipCount={combatant.actor.reactive.system.health.scrapes.max}
                        onSelectPip={(newValue) => updateHealthTrack("scrapes", newValue)}
                    />
                </dd>
            </div>

            <div class="bnd-combatant-health-field">
                <dt class="bnd-combatant-health-field__label">Wounds (7&hyphen;9)</dt>

                <dd class="bnd-combatant-health-field__pips">
                    <PipGroup
                        flex={true}
                        disabled={!isOwner}
                        markedPips={combatant.actor.reactive.system.health.wounds.value}
                        pipCount={combatant.actor.reactive.system.health.wounds.max}
                        onSelectPip={(newValue) => updateHealthTrack("wounds", newValue)}
                    />
                </dd>
            </div>

            <div class="bnd-combatant-health-field">
                <dt class="bnd-combatant-health-field__label">Injuries (10+)</dt>

                <dd class="bnd-combatant-health-field__pips">
                    <PipGroup
                        flex={true}
                        disabled={!isOwner}
                        markedPips={combatant.actor.reactive.system.health.injuries.value}
                        pipCount={combatant.actor.reactive.system.health.injuries.max}
                        onSelectPip={(newValue) =>
                            updateHealthTrack("injuries", newValue)}
                    />
                </dd>
            </div>
        </dl>
    {/if}

    {#if isOwner || (isObserver && combatant.reactive.system.notes)}
        <label class="bnd-combatant__notes">
            <span class="bnd-combatant__note-label"> Notes </span>

            <input
                contenteditable
                disabled={!isOwner}
                autocapitalize="off"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                type="text"
                class="bnd-combatant__note-input"
                value={combatant.reactive.system.notes}
                onchange={({ target }) =>
                    combatant.update({ "system.notes": target.value })}
            />
        </label>
    {/if}
</article>
