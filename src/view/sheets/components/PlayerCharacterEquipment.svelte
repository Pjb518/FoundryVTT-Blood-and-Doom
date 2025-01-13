<script>
    import { getContext } from "svelte";
    import ArmorConfigDialog from "../../dialogs/ArmorConfigDialog.svelte";
    import GenericDialog from "../../../documents/dialogs/GenericDialog.svelte.ts";
    import PipGroup from "#view/components/PipGroup.svelte";

    async function configureArmor() {
        const dialog = new GenericDialog(
            `${actor.name}: Configure Armor`,
            ArmorConfigDialog,
            { actor },
        );

        dialog.render(true);
    }

    async function createAmmo() {
        const [newItem] = await actor.createEmbeddedDocuments("Item", [
            { name: "New Ammunition", type: "ammunition" },
        ]);

        newItem.sheet.render(true);
    }

    async function createWeapon() {
        const [newItem] = await actor.createEmbeddedDocuments("Item", [
            { name: "New Weapon", type: "weapon" },
        ]);

        newItem.sheet.render(true);
    }

    function prepareDamageLabel(formula, damageType) {
        if (!formula) return "0";
        if (!Roll.validate(formula)) return "Invalid Formula";

        const formulaTerms = new Roll(formula).terms;

        const bareFormula = Roll.fromTerms(
            formulaTerms.map((term) => {
                term.options.flavor = "";
                return term;
            }),
        ).formula;

        if (damageType) return `${bareFormula} (${damageType})`;

        return bareFormula;
    }

    async function updateArmorDents(newValue) {
        let updateValue = newValue;

        if (actor.reactive.system.armor.dents.value >= newValue) updateValue -= 1;

        actor.update({
            "system.armor.dents.value": updateValue,
        });
    }

    let actor = getContext("actor");
    let sheet = getContext("sheet");
</script>

<section class="bnd-equipment-container bnd-box">
    <div class="bnd-equipment-container--left">
        <section class="bnd-weapon-container">
            <header class="bnd-weapon-container__header">
                <h3
                    class="bnd-heading bnd-heading--section bnd-weapon-container__heading"
                >
                    Weapons & Armor
                </h3>

                <button
                    class="bnd-weapon-container__add-button"
                    type="button"
                    aria-label="Create Weapon"
                    data-tooltip="Create Weapon"
                    onclick={createWeapon}
                >
                    <i class="fa-solid fa-plus"></i>
                </button>
            </header>

            <table class="bnd-equipment-table">
                <thead class="bnd-equipment-table__header">
                    <tr>
                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header"
                        >
                            Name
                        </th>

                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header bnd-equipment-table__cell--button"
                        ></th>

                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header bnd-equipment-table__cell--button"
                        ></th>

                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header bnd-equipment-table__cell--center"
                        >
                            Abil. + Skill
                        </th>

                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header bnd-equipment-table__cell--center"
                        >
                            Attributes
                        </th>

                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header bnd-equipment-table__cell--center"
                        >
                            Damage
                        </th>

                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header bnd-equipment-table__cell--checkbox"
                            data-tooltip="Dented"
                        >
                            <i class="fa-solid fa-heart-crack"></i>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {#each actor.reactive.items.filter(({ type }) => type === "weapon") as item (item.id)}
                        <tr>
                            <td class="bnd-equipment-table__cell">
                                {item.reactive.name}
                            </td>

                            <td
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--button"
                            >
                                <button
                                    class="bnd-equipment-table__button"
                                    type="button"
                                    aria-label="Configure Item"
                                    data-tooltip="Configure Item"
                                    onclick={() => item.sheet.render(true)}
                                >
                                    <i class="fa-solid fa-cog"></i>
                                </button>
                            </td>

                            <td
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--button"
                            >
                                <button
                                    class="bnd-equipment-table__button"
                                    type="button"
                                    aria-label="Delete Item"
                                    data-tooltip="Delete Item"
                                    onclick={() => item.delete()}
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>

                            <td
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--center"
                            >
                                {item.reactive.system.abilitySkillMod}
                            </td>

                            <td
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--center"
                            >
                                {item.reactive.system.attributes}
                            </td>

                            <td
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--center"
                            >
                                <button
                                    class="bnd-equipment-table__damage-button"
                                    type="button"
                                    aria-label="Roll Damage"
                                    data-tooltip="Roll Damage"
                                    onclick={() => item.rollDamage()}
                                >
                                    {prepareDamageLabel(
                                        item.reactive.system.damage.formula,
                                        item.reactive.system.damage.type,
                                    )}
                                </button>
                            </td>

                            <td
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--checkbox"
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
                        </tr>
                    {:else}
                        <tr>
                            <td
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--empty-table"
                                colspan="7"
                            >
                                No weapons to display
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </section>

        <section class="bnd-armor-equipment-container">
            <div class="bnd-armor-equipment-container__field">
                <label class="bnd-armor-equipment-container__field">
                    Armor Name & Info

                    <input
                        class="bnd-sheet-input"
                        type="text"
                        value={actor.system.armor.info}
                        onchange={({ target }) =>
                            actor.update({
                                "system.armor.info": target.value,
                            })}
                    />
                </label>

                <PipGroup
                    flex={true}
                    ghostPips={5 - actor.reactive.system.armor.dents.max}
                    markedPips={actor.reactive.system.armor.dents.value}
                    pipCount={actor.reactive.system.armor.dents.max}
                    onSelectPip={updateArmorDents}
                />

                <button
                    class="bnd-armor-equipment-container__config-button"
                    type="button"
                    aria-label="Configure Armor"
                    data-tooltip="Configure Armor"
                    onclick={configureArmor}
                >
                    <i class="fa-solid fa-cog"></i>
                </button>
            </div>
        </section>
    </div>

    <div class="bnd-equipment-container--right">
        <section class="bnd-ammunition-container">
            <header class="bnd-ammunition-container__header">
                <h3
                    class="bnd-heading bnd-heading--section bnd-ammunition-container__heading"
                >
                    Ammo / Supply
                </h3>

                <button
                    class="bnd-weapon-container__add-button"
                    type="button"
                    aria-label="Create Ammunition"
                    data-tooltip="Create Ammunition"
                    onclick={createAmmo}
                >
                    <i class="fa-solid fa-plus"></i>
                </button>
            </header>

            <table class="bnd-equipment-table">
                <thead class="bnd-equipment-table__header">
                    <tr>
                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header"
                        >
                            Name
                        </th>

                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header bnd-equipment-table__cell--button"
                        ></th>

                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header bnd-equipment-table__cell--button"
                        ></th>

                        <th
                            class="bnd-equipment-table__cell bnd-equipment-table__cell--header bnd-equipment-table__cell--center"
                            data-tooltip="Ammunition Quantity"
                        >
                            <i class="fa-solid fa-hashtag"></i>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {#each actor.reactive.items.filter(({ type }) => type === "ammunition") as item (item.id)}
                        <tr>
                            <td class="bnd-equipment-table__cell">
                                {item.reactive.name}
                            </td>

                            <td
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--button"
                            >
                                <button
                                    class="bnd-equipment-table__button"
                                    type="button"
                                    aria-label="Configure Item"
                                    data-tooltip="Configure Item"
                                    onclick={() => item.sheet.render(true)}
                                >
                                    <i class="fa-solid fa-cog"></i>
                                </button>
                            </td>

                            <td
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--button"
                            >
                                <button
                                    class="bnd-equipment-table__button"
                                    type="button"
                                    aria-label="Delete Item"
                                    data-tooltip="Delete Item"
                                    onclick={() => item.delete()}
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>

                            <td
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--center"
                            >
                                <div class="bnd-ammunition-quantity-wrapper">
                                    <input
                                        class="bnd-ammunition-quantity-input"
                                        type="number"
                                        value={item.reactive.system.quantity.value}
                                        onchange={({ target }) =>
                                            item.update({
                                                "system.quantity.value": target.value,
                                            })}
                                    />
                                    /
                                    <input
                                        class="bnd-ammunition-quantity-input"
                                        type="number"
                                        value={item.reactive.system.quantity.max}
                                        onchange={({ target }) =>
                                            item.update({
                                                "system.quantity.max": target.value,
                                            })}
                                    />

                                    <button
                                        class="bnd-ammunition-decrement-button"
                                        type="button"
                                        aria-label="Decrement Ammunition Count"
                                        data-tooltip="Decrement Ammunition Count"
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
                                class="bnd-equipment-table__cell bnd-equipment-table__cell--empty-table"
                                colspan="8"
                            >
                                No ammunition to display
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>

            <section class="bnd-unarmed-container">
                <header class="bnd-unarmed-container__header">
                    <h3
                        class="bnd-heading bnd-heading--section bnd-unarmed-container__heading"
                    >
                        Unarmed Attacks
                    </h3>
                </header>

                <label class="bnd-unarmed-container__field">
                    Ability + Skill

                    <input
                        class="bnd-sheet-input"
                        type="number"
                        value={actor.reactive.system.unarmedAttacks.abilitySkillMod}
                        onchange={({ target }) =>
                            actor.update({
                                "system.unarmedAttacks.abilitySkillMod": target.value,
                            })}
                    />
                </label>

                <label class="bnd-unarmed-container__field">
                    Damage

                    <input
                        class="bnd-sheet-input"
                        type="text"
                        value={actor.reactive.system.unarmedAttacks.damage}
                        onchange={({ target }) =>
                            actor.update({
                                "system.unarmedAttacks.damage": target.value,
                            })}
                    />
                </label>
            </section>
        </section>

        <section class="bnd-combat-resolve-container">
            <label class="bnd-combat-resolve-container__field">
                Combat Resolve Difficulty

                <input
                    class="bnd-sheet-input"
                    type="number"
                    value={actor.reactive.system.combatResolveDifficulty}
                    onchange={({ target }) =>
                        actor.update({
                            "system.combatResolveDifficulty": target.value,
                        })}
                />
            </label>
        </section>
    </div>
</section>
