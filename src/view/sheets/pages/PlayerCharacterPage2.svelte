<script>
    import Editor from "#view/components/Editor.svelte";
    import PipGroup from "#view/components/PipGroup.svelte";
    import { getContext } from "svelte";

    async function createEquipment() {
        const [newItem] = await actor.createEmbeddedDocuments("Item", [
            { name: "New Item", type: "equipment" },
        ]);

        newItem.sheet.render(true);
    }

    async function createMiscellaneousItem() {
        const [newItem] = await actor.createEmbeddedDocuments("Item", [
            { name: "New Item", type: "miscellaneous" },
        ]);

        newItem.sheet.render(true);
    }

    async function updateActorImage(document, options = { shiftKey: false }) {
        // Add support for tokenizer
        if (game.modules.get("vtta-tokenizer")?.active && !options.shiftKey) {
            if (["character", "soloMonster"].includes(document.type)) {
                // eslint-disable-next-line no-undef
                Tokenizer?.tokenizeActor(document);
                return null;
            }
        }

        const filePicker = new FilePicker({
            type: "image",
            current: document.img,
            callback: async (path) => {
                await document.update({ img: path });
            },
        });

        return filePicker.browse();
    }

    async function updateCorruptionScore(newValue) {
        let updateValue = newValue;

        if (actor.reactive.system.corruption >= newValue) updateValue -= 1;

        actor.update({ "system.corruption": updateValue });
    }

    async function updateProficiency(value, key, i) {
        const currentValues = actor.reactive.system[key];
        actor.update({ [`system.${key}`]: currentValues.with(i, value) });
    }

    async function updateTreasure(value, i) {
        const currentValues = actor.reactive.system.treasure;
        actor.update({ "system.treasure": currentValues.with(i, value) });
    }

    const { bioEditorButtonLabels, bioEditorButtonLabelsOrder, proficiencyGroupLabels } =
        CONFIG.BLOOD_AND_DOOM;

    let actor = getContext("actor");
    let currentEditor = $state("appearance");
</script>

<section class="bnd-sheet__body bnd-sheet__body--player-character-page-2">
    <section class="bnd-actor-portrait">
        <button
            class="bnd-actor-portrait__button"
            onclick={(event) => updateActorImage(actor, event)}
            type="button"
            aria-label="Change Actor Image"
            data-tooltip="Change Actor Image"
        >
            <img
                class="bnd-actor-portrait__image"
                src={actor.reactive.img}
                alt={actor.reactive.name}
            />
        </button>

        <section class="bnd-corruption">
            <header>
                <h3 class="bnd-heading">Corruption</h3>
            </header>

            <PipGroup
                pipCount="6"
                markedPips={actor.reactive.system.corruption}
                onSelectPip={updateCorruptionScore}
            />
        </section>
    </section>

    <section class="bnd-bio-editor">
        <ul class="bnd-bio-editor-tabs">
            {#each Object.keys(actor.reactive.system.bio).sort((a, b) => bioEditorButtonLabelsOrder.get(a) - bioEditorButtonLabelsOrder.get(b)) as key}
                <li class="bnd-bio-editor-tabs__item">
                    <button
                        class="bnd-bio-editor-tabs__button"
                        class:bnd-bio-editor-tabs__button--active={currentEditor === key}
                        onclick={() => (currentEditor = key)}
                    >
                        {bioEditorButtonLabels.get(key)}
                    </button>
                </li>
            {/each}
        </ul>

        <div class="bnd-bio-editor__content bnd-box bnd-box--padded">
            {#each Object.entries(actor.reactive.system.bio) as [key, value]}
                {#if currentEditor === key}
                    {#key value}
                        <Editor
                            field="system.bio.{key}"
                            content={value}
                            document={actor}
                        />
                    {/key}
                {/if}
            {/each}
        </div>
    </section>

    <section class="bnd-actor-proficiencies bnd-box bnd-box--padded">
        {#each ["proficiencies", "languages", "feats", "discoveredSpells"] as key}
            <section class="bnd-actor-proficiencies__group">
                <header>
                    <h3 class="bnd-heading">
                        {proficiencyGroupLabels.get(key)}
                    </h3>
                </header>

                <ul class="bnd-actor-proficiencies-list">
                    {#each { length: 6 }, i}
                        <li>
                            <input
                                class="bnd-sheet-input"
                                type="text"
                                value={actor.reactive.system[key][i]}
                                onchange={({ target }) =>
                                    updateProficiency(target.value, key, i)}
                            />
                        </li>
                    {/each}
                </ul>
            </section>
        {/each}
    </section>

    <section class="bnd-secondary-equipment">
        <section class="bnd-treasure bnd-box bnd-box--padded">
            <div class="bnd-treasure__top">
                <div class="bnd-currency">
                    <label class="bnd-currency__field">
                        Silver

                        <input
                            class="bnd-sheet-input"
                            type="number"
                            min="0"
                            value={actor.reactive.system.currency.silver}
                            onchange={({ target }) =>
                                actor.update({
                                    "system.currency.silver": target.value,
                                })}
                        />
                    </label>

                    <label class="bnd-currency__field">
                        Gold

                        <input
                            class="bnd-sheet-input"
                            type="number"
                            min="0"
                            value={actor.reactive.system.currency.gold}
                            onchange={({ target }) =>
                                actor.update({
                                    "system.currency.gold": target.value,
                                })}
                        />
                    </label>
                </div>

                <label class="bnd-assets">
                    Assets

                    <input
                        class="bnd-sheet-input"
                        type="text"
                        value={actor.reactive.system.assets}
                        onchange={({ target }) =>
                            actor.update({
                                "system.assets": target.value,
                            })}
                    />
                </label>
            </div>

            <div class="bnd-treasure__bottom bnd-miscellaneous-objects">
                <header class="bnd-miscellaneous-objects__header">
                    <h3 class="bnd-heading">Misc Items & Treasure</h3>

                    <button
                        class="bnd-miscellaneous-objects__add-button"
                        type="button"
                        aria-label="Add Item"
                        data-tooltip="Add Item"
                        onclick={createMiscellaneousItem}
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </header>

                <ul class="bnd-miscellaneous-objects-list">
                    {#each actor.reactive.items.filter((item) => item.type === "miscellaneous") as item, i}
                        <li class="bnd-miscellaneous-objects-list__item">
                            <span class="bnd-miscellaneous-objects-list__item-name">
                                {item.reactive.name}
                            </span>

                            <button
                                class="bnd-miscellaneous-objects-list__config-button"
                                type="button"
                                aria-label="Configure Item"
                                data-tooltip="Configure Item"
                                onclick={() => item.sheet.render(true)}
                            >
                                <i class="fa-solid fa-cog"></i>
                            </button>

                            <button
                                class="bnd-miscellaneous-objects-list__config-button"
                                type="button"
                                aria-label="Delete Item"
                                data-tooltip="Delete Item"
                                onclick={() => item.delete()}
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </li>
                    {:else}
                        <li class="bnd-miscellaneous-objects-list__item">
                            No items to display.
                        </li>
                    {/each}
                </ul>
            </div>
        </section>

        <section class="bnd-box bnd-box--padded">
            <header class="bnd-secondary-equipment__header">
                <h3 class="bnd-secondary-equipment__heading bnd-heading">Equipment</h3>

                <button
                    class="bnd-secondary-equipment__add-button"
                    onclick={createEquipment}
                    aria-label="Create Item"
                    data-tooltip="Create Item"
                >
                    <i class="fa-solid fa-plus"></i>
                </button>
            </header>

            <table class="bnd-secondary-equipment-table">
                <thead class="bnd-secondary-equipment-table__header">
                    <tr>
                        <th
                            class="bnd-secondary-equipment-table__cell bnd-secondary-equipment-table__cell--header"
                        >
                            Name
                        </th>

                        <th
                            class="bnd-secondary-equipment-table__cell bnd-secondary-equipment-table__cell--button"
                        >
                        </th>

                        <th
                            class="bnd-secondary-equipment-table__cell bnd-secondary-equipment-table__cell--button"
                        >
                        </th>

                        <th
                            class="bnd-secondary-equipment-table__cell bnd-equipment-table__cell--center bnd-secondary-equipment-table__cell--fit bnd-secondary-equipment-table__cell--header"
                        >
                            Info
                        </th>

                        <th
                            class="bnd-secondary-equipment-table__cell bnd-secondary-equipment-table__cell--checkbox bnd-secondary-equipment-table__cell--header"
                        >
                            <i class="fa-solid fa-heart-crack"></i>
                        </th>

                        <th
                            class="bnd-secondary-equipment-table__cell bnd-equipment-table__cell--center bnd-secondary-equipment-table__cell--fit bnd-secondary-equipment-table__cell--header"
                        >
                            #
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {#each actor.reactive.items.filter((item) => item.type === "equipment") as item (item.id)}
                        <tr>
                            <td class="bnd-secondary-equipment-table__cell">
                                {item.reactive.name}
                            </td>

                            <td
                                class="bnd-secondary-equipment-table__cell bnd-secondary-equipment-table__cell--button"
                            >
                                <button
                                    class="bnd-secondary-equipment-table__button"
                                    type="button"
                                    aria-label="Configure Item"
                                    data-tooltip="Configure Item"
                                    onclick={() => item.sheet.render(true)}
                                >
                                    <i class="fa-solid fa-cog"></i>
                                </button>
                            </td>

                            <td
                                class="bnd-secondary-equipment-table__cell bnd-secondary-equipment-table__cell--button"
                            >
                                <button
                                    class="bnd-secondary-equipment-table__button"
                                    type="button"
                                    aria-label="Configure Item"
                                    data-tooltip="Configure Item"
                                    onclick={() => item.delete()}
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>

                            <td
                                class="bnd-secondary-equipment-table__cell bnd-equipment-table__cell--center bnd-secondary-equipment-table__cell--fit"
                            >
                                {item.reactive.system.info}
                            </td>

                            <td
                                class="bnd-secondary-equipment-table__cell bnd-secondary-equipment-table__cell--checkbox"
                            >
                                <input
                                    type="checkbox"
                                    checked={item.reactive.system.dented}
                                    onchange={({ target }) =>
                                        item.update({
                                            "system.dented": target.checked,
                                        })}
                                />
                            </td>

                            <td
                                class="bnd-secondary-equipment-table__cell bnd-equipment-table__cell--center bnd-secondary-equipment-table__cell--fit"
                            >
                                <div class="bnd-secondary-equipment-quantity-wrapper">
                                    <input
                                        class="bnd-equipment-quantity-input"
                                        type="number"
                                        value={item.reactive.system.quantity.value}
                                        onchange={({ target }) =>
                                            item.update({
                                                "system.quantity.value": target.value,
                                            })}
                                    />
                                    /
                                    <input
                                        class="bnd-equipment-quantity-input"
                                        type="number"
                                        value={item.reactive.system.quantity.max}
                                        onchange={({ target }) =>
                                            item.update({
                                                "system.quantity.max": target.value,
                                            })}
                                    />

                                    <button
                                        class="bnd-secondary-equipment-decrement-button"
                                        type="button"
                                        aria-label="Decrement Item Count"
                                        data-tooltip="Decrement Item Count"
                                        disabled={item.reactive.system.quantity.value ===
                                            0}
                                        onclick={() =>
                                            item.update({
                                                "system.quantity.value": Math.max(
                                                    item.reactive.system.quantity.value -
                                                        1,
                                                    0,
                                                ),
                                            })}
                                    >
                                        <i class="fa-solid fa-square-caret-down"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    {:else}
                        <tr>
                            <td
                                class="bnd-secondary-equipment-table__cell bnd-secondary-equipment-table__cell--empty-table"
                                colspan="7"
                            >
                                No equipment to display
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </section>
    </section>
</section>
