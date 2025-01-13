<script>
    async function updateWeaponName(newName) {
        await weapon.update({ name: newName });
        sheet.updateTitle(newName);
    }

    let { weapon, sheet } = $props();
</script>

<section class="bnd-sheet__body bnd-sheet__body--weapon">
    <div class="bnd-weapon-config bnd-box bnd-box--padded">
        <label class="bnd-weapon-config__field">
            Name

            <input
                class="bnd-sheet-input"
                type="text"
                value={weapon.reactive.name}
                onchange={({ target }) => updateWeaponName(target.value)}
            />
        </label>

        <label class="bnd-weapon-config__field">
            Info & Attributes

            <input
                class="bnd-sheet-input"
                type="text"
                value={weapon.reactive.system.attributes}
                onchange={({ target }) =>
                    weapon.update({ "system.attributes": target.value })}
            />
        </label>

        <label class="bnd-weapon-config__field bnd-weapon-config__field--checkbox">
            <input
                type="checkbox"
                checked={weapon.reactive.system.dented}
                onchange={({ target }) =>
                    weapon.update({ "system.dented": target.checked })}
            />

            Dented
        </label>
    </div>

    <div class="bnd-weapon-config bnd-box bnd-box--padded">
        <label
            class="bnd-weapon-config__field bnd-weapon-config__field--ability-skill-mod"
        >
            Ability + Skill

            <input
                class="bnd-sheet-input"
                type="number"
                value={weapon.reactive.system.abilitySkillMod}
                onchange={({ target }) =>
                    weapon.update({ "system.abilitySkillMod": target.value })}
            />
        </label>

        <div class="bnd-damage-wrapper">
            <label class="bnd-weapon-config__field">
                Damage Formula

                <input
                    class="bnd-sheet-input"
                    type="text"
                    value={weapon.reactive.system.damage.formula}
                    onchange={({ target }) =>
                        weapon.update({ "system.damage.formula": target.value })}
                />
            </label>

            <label class="bnd-weapon-config__field bnd-weapon-config__field--damage-type">
                Damage Type

                <input
                    class="bnd-sheet-input"
                    type="text"
                    value={weapon.reactive.system.damage.type}
                    onchange={({ target }) =>
                        weapon.update({ "system.damage.type": target.value })}
                />
            </label>
        </div>
    </div>
</section>
