<script>
    async function updateAmmoName(newName) {
        await ammunition.update({ name: newName });
        sheet.updateTitle(newName);
    }

    let { ammunition, sheet } = $props();
</script>

<section class="bnd-sheet__body bnd-sheet__body--ammunition">
    <div class="bnd-ammo-config bnd-box bnd-box--padded">
        <label class="bnd-ammo-config__field bnd-ammo-config__field--name">
            Name

            <input
                class="bnd-sheet-input"
                type="text"
                value={ammunition.reactive.name}
                onchange={({ target }) => updateAmmoName(target.value)}
            />
        </label>

        <div class="bnd-damage-wrapper">
            <label class="bnd-ammo-config__field">
                Current Quantity

                <input
                    class="bnd-sheet-input"
                    type="text"
                    value={ammunition.reactive.system.quantity.value}
                    onchange={({ target }) =>
                        ammunition.update({ "system.quantity.value": target.value })}
                />
            </label>

            <label class="bnd-ammo-config__field">
                Maximum Quantity

                <input
                    class="bnd-sheet-input"
                    type="text"
                    value={ammunition.reactive.system.quantity.max}
                    onchange={({ target }) =>
                        ammunition.update({ "system.quantity.max": target.value })}
                />
            </label>
        </div>
    </div>
</section>
