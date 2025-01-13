<script>
    async function updateItemName(newName) {
        await item.update({ name: newName });
        sheet.updateTitle(newName);
    }

    let { item, sheet } = $props();
</script>

<section class="bnd-sheet__body bnd-sheet__body--weapon">
    <div class="bnd-weapon-config bnd-box bnd-box--padded">
        <label class="bnd-weapon-config__field">
            Name

            <input
                class="bnd-sheet-input"
                type="text"
                value={item.reactive.name}
                onchange={({ target }) => updateItemName(target.value)}
            />
        </label>

        <label class="bnd-weapon-config__field">
            Info

            <input
                class="bnd-sheet-input"
                type="text"
                value={item.reactive.system.info}
                onchange={({ target }) => item.update({ "system.info": target.value })}
            />
        </label>

        <label class="bnd-weapon-config__field bnd-weapon-config__field--checkbox">
            <input
                type="checkbox"
                checked={item.reactive.system.dented}
                onchange={({ target }) =>
                    item.update({ "system.dented": target.checked })}
            />

            Dented
        </label>
    </div>

    <div class="bnd-box bnd-box--padded bnd-damage-wrapper">
        <label class="bnd-ammo-config__field">
            Current Quantity

            <input
                class="bnd-sheet-input"
                type="text"
                value={item.reactive.system.quantity.value}
                onchange={({ target }) =>
                    item.update({ "system.quantity.value": target.value })}
            />
        </label>

        <label class="bnd-ammo-config__field">
            Maximum Quantity

            <input
                class="bnd-sheet-input"
                type="text"
                value={item.reactive.system.quantity.max}
                onchange={({ target }) =>
                    item.update({ "system.quantity.max": target.value })}
            />
        </label>
    </div>
</section>
