<script>
    import PipGroup from "#view/components/PipGroup.svelte";

    import GenericDialog from "../../documents/dialogs/GenericDialog.svelte.ts";
    import HealthConfigDialog from "#view/dialogs/HealthConfigDialog.svelte";
    import MonsterHeaderConfigDialog from "#view/dialogs/MonsterHeaderConfigDialog.svelte";
    import MonsterTraitConfigDialog from "../../documents/dialogs/MonsterTraitConfigDialog.svelte.ts";

    async function createMonsterFeature() {
        const [newFeature] = await actor.createEmbeddedDocuments("Item", [
            { name: "New Action", type: "monsterFeature" },
        ]);

        newFeature.sheet.render(true);
    }

    async function configureHealth() {
        const dialogTitle = `${actor.reactive.name}: Configure Health`;

        const dialog = new GenericDialog(
            dialogTitle,
            HealthConfigDialog,
            { actor },
            { icon: "fa-solid fa-heart", width: 208 },
        );

        dialog.render(true);
    }

    async function configureMonsterHeaderData() {
        const dialogTitle = `${actor.reactive.name}: Configure`;

        const dialog = new GenericDialog(dialogTitle, MonsterHeaderConfigDialog, {
            actor,
        });

        dialog.render(true);
    }

    async function configureTrait(trait) {
        const dialog = new MonsterTraitConfigDialog(
            { document: actor },
            { trait, width: 552 },
        );

        dialog.render(true);
    }

    async function updateActorName(newName) {
        await actor.update({ name: newName });
        sheet.updateTitle(newName);
    }

    async function updateHealthTrack(track, newValue) {
        let updateValue = newValue;
        let currentValue = actor.reactive.system.health[track].value;

        if (currentValue >= newValue) updateValue -= 1;

        actor.update({
            [`system.health.${track}.value`]: updateValue,
        });
    }

    const {
        abilities,
        abilityCategories,
        abilityGroupings,
        healthTracks,
        healthTrackOrder,
        resolveTypes,
        traitHeadings,
    } = CONFIG.BLOOD_AND_DOOM;

    let { actor, sheet } = $props();

    let activeHealthTracks = $derived(
        Object.entries(actor.reactive.system.health).reduce((tracks, [key, track]) => {
            if (track) tracks.push(key);
            return tracks;
        }, []),
    );
</script>

<section class="bnd-sheet__body bnd-sheet__body--npc">
    <header
        class="bnd-monster-header bnd-sheet__header bnd-sheet__header--npc bnd-box bnd-box--padded"
    >
        <input
            class="bnd-sheet-input"
            type="text"
            value={actor.reactive.name}
            onchange={({ target }) => updateActorName(target.value)}
        />

        {#if actor.reactive.system.creatureType}
            <div class="bnd-monster-header__creature-type">
                <span>{actor.reactive.system.creatureType}</span>
                /
            </div>
        {/if}

        <div class="bnd-monster-header__challenge">
            Challenge

            <span class="bnd-monster-header__challenge-value">
                {actor.reactive.system.challenge}
            </span>
        </div>

        <button
            class="bnd-monster-header__config-button"
            onclick={configureMonsterHeaderData}
            aria-label="Configure Actor"
            data-tooltip="Configure Actor"
        >
            <i class="fa-solid fa-cog"></i>
        </button>
    </header>

    <section class="bnd-monster-attributes bnd-box bnd-box--padded">
        <section class="bnd-monster-ability-scores">
            <header class="bnd-monster-ability-scores__header">
                <h2 class="bnd-heading">Abilities</h2>
            </header>

            {#each abilityCategories as [key, heading] (key)}
                <section class="bnd-monster-ability-category">
                    <h3 class="bnd-heading bnd-heading--ability-category">
                        {heading}
                    </h3>

                    <div class="bnd-monster-ability-category__fields">
                        {#each abilityGroupings.get(key) as abilityKey (abilityKey)}
                            {@const abilityScore =
                                actor.reactive.system.abilities[abilityKey]}
                            {@const abilityHeading = abilities.get(abilityKey)}

                            <label class="bnd-monster-ability-scores__field">
                                {abilityHeading}

                                <input
                                    class="bnd-sheet-input"
                                    type="number"
                                    value={abilityScore}
                                    onchange={({ target }) =>
                                        actor.update({
                                            [`system.abilities.${abilityKey}`]:
                                                target.value,
                                        })}
                                />
                            </label>
                        {/each}
                    </div>
                </section>
            {/each}
        </section>

        <section class="bnd-monster-secondary-attributes">
            <label
                class="bnd-monster-secondary-attributes__field bnd-monster-secondary-attributes__field--size"
            >
                Size

                <input
                    class="bnd-sheet-input"
                    type="text"
                    value={actor.reactive.system.size}
                    onchange={({ target }) =>
                        actor.update({
                            "system.size": target.value,
                        })}
                />
            </label>

            <label
                class="bnd-monster-secondary-attributes__field bnd-monster-secondary-attributes__field--speed"
            >
                Speed

                <input
                    class="bnd-sheet-input"
                    type="text"
                    value={actor.reactive.system.speed}
                    onchange={({ target }) =>
                        actor.update({
                            "system.speed": target.value,
                        })}
                />
            </label>

            <label class="bnd-monster-secondary-attributes__field">
                Perception

                <input
                    class="bnd-sheet-input"
                    type="text"
                    value={actor.reactive.system.perception}
                    onchange={({ target }) =>
                        actor.update({
                            "system.perception": target.value,
                        })}
                />
            </label>

            <label class="bnd-monster-secondary-attributes__field">
                Stealth

                <input
                    class="bnd-sheet-input"
                    type="text"
                    value={actor.reactive.system.stealth}
                    onchange={({ target }) =>
                        actor.update({
                            "system.stealth": target.value,
                        })}
                />
            </label>

            <label class="bnd-monster-secondary-attributes__field">
                Evasion

                <input
                    class="bnd-sheet-input"
                    type="text"
                    value={actor.reactive.system.evasion}
                    onchange={({ target }) =>
                        actor.update({
                            "system.evasion": target.value,
                        })}
                />
            </label>

            <label class="bnd-monster-secondary-attributes__field">
                Armor

                <input
                    class="bnd-sheet-input"
                    type="text"
                    value={actor.reactive.system.armorValue}
                    onchange={({ target }) =>
                        actor.update({
                            "system.armorValue": target.value,
                        })}
                />
            </label>
        </section>

        <section class="bnd-monster-health">
            <header class="bnd-monster-health__header">
                <h3 class="bnd-monster-health__heading bnd-heading">
                    Health

                    <button
                        class="bnd-monster-health__config-button"
                        type="button"
                        aria-label="Configure Monster Health"
                        onclick={configureHealth}
                    >
                        <i class="fa-solid fa-cog"></i>
                    </button>
                </h3>
            </header>

            <div class="bnd-monster-health__tracks">
                {#each Object.entries(actor.reactive.system.health).toSorted(([a], [b]) => healthTrackOrder.get(a) - healthTrackOrder.get(b)) as [key, track] (key)}
                    <div class="bnd-monster-health__track">
                        <span>
                            {healthTracks.get(key)}
                        </span>

                        <PipGroup
                            flex={true}
                            markedPips={track.value}
                            pipCount={track.max}
                            onSelectPip={(newValue) => updateHealthTrack(key, newValue)}
                        />
                    </div>
                {/each}
            </div>
        </section>

        <section class="bnd-monster-resolve">
            <header class="bnd-monster-resolve__header">
                <h2 class="bnd-heading">Resolve</h2>
            </header>

            <ul class="bnd-monster-resolve-list">
                {#each Object.entries(actor.reactive.system.resolve) as [key, value]}
                    <li class="bnd-monster-resolve-list__item">
                        <label class="bnd-monster-resolve-list__field">
                            {resolveTypes.get(key)}

                            <input
                                class="bnd-sheet-input"
                                type="number"
                                min="0"
                                {value}
                                onchange={({ target }) =>
                                    actor.update({
                                        [`system.resolve.${key}`]: target.value,
                                    })}
                            />
                        </label>
                    </li>
                {/each}
            </ul>
        </section>
    </section>

    <section class="bnd-box bnd-box--padded">
        <dl class="bnd-monster-trait-list">
            {#each ["traits", "skills", "special", "weakness"] as trait}
                <dt class="bnd-monster-trait-list__trait">
                    <button
                        class="bnd-monster-trait-list__config-button"
                        type="button"
                        aria-label="Configure Trait"
                        onclick={() => configureTrait(trait)}
                    >
                        <i class="fa-solid fa-edit"></i>
                        {traitHeadings.get(trait) ?? trait}.
                    </button>
                </dt>

                {#await actor.reactive.system[trait] then traitDescription}
                    <dd class="bnd-monster-trait-list__value">
                        {@html traitDescription || "&mdash;"}
                    </dd>
                {/await}
            {/each}

            <hr class="bnd-monster-trait-list__rule" />

            {#each ["weapons", "armor", "other"] as trait}
                <dt class="bnd-monster-trait-list__trait">
                    <button
                        class="bnd-monster-trait-list__config-button"
                        type="button"
                        aria-label="Configure Trait"
                        onclick={() => configureTrait(trait)}
                    >
                        <i class="fa-solid fa-edit"></i>
                        {traitHeadings.get(trait) ?? trait}.
                    </button>
                </dt>

                {#await actor.reactive.system[trait] then traitDescription}
                    <dd class="bnd-monster-trait-list__value">
                        {@html traitDescription || "&mdash; "}
                    </dd>
                {/await}
            {/each}
        </dl>
    </section>

    <section class="bnd-monster-features bnd-box bnd-box--padded">
        <header class="bnd-monster-features__header">
            <h2 class="bnd-heading bnd-heading--section">Actions</h2>

            <button
                class="bnd-monster-features__add-button"
                type="button"
                aria-label="Add Action"
                data-tooltip="Add Action"
                onclick={createMonsterFeature}
            >
                <i class="fa-solid fa-plus"></i>
            </button>
        </header>

        <ul class="bnd-monster-feature-list">
            {#each [...actor.reactive.items].toSorted( (a, b) => a.name.localeCompare(b.name), ) as item (item.id)}
                <li class="bnd-monster-feature-list__item">
                    <article class="bnd-monster-feature">
                        <header class="bnd-monster-feature__header">
                            <h3 class="bnd-monster-feature__heading bnd-heading">
                                {item.reactive.name}
                            </h3>

                            <button
                                class="bnd-monster-feature__button"
                                type="button"
                                aria-label="Edit Feature"
                                data-tooltip="Edit Feature"
                                onclick={() => item.sheet.render(true)}
                            >
                                <i class="fa-solid fa-edit"></i>
                            </button>

                            <button
                                class="bnd-monster-feature__button"
                                type="button"
                                aria-label="Delete Feature"
                                data-tooltip="Delete Feature"
                                onclick={() => item.delete()}
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </header>

                        <div class="bnd-monster-feature__description">
                            {#await TextEditor.enrichHTML(item.reactive.system.description) then description}
                                {@html description || "No description available."}
                            {/await}
                        </div>
                    </article>
                </li>
            {:else}
                <li>No actions to display</li>
            {/each}
        </ul>
    </section>
</section>
