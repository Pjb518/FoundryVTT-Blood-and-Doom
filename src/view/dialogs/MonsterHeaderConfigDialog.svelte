<script>
    async function updateActorName(newName) {
        await actor.update({ name: newName });

        const sheetTitleElement = dialog.window.title;

        if (!sheetTitleElement) return;

        sheetTitleElement.innerText = `${newName}: Configure`;
    }

    let { actor, dialog } = $props();
</script>

<section class="bnd-sheet__body bnd-sheet__body--monster-header-config">
    <div class="bnd-monster-header-config bnd-box bnd-box--padded">
        <label class="bnd-monster-header-config__field">
            Name

            <input
                class="bnd-sheet-input"
                type="text"
                value={actor.reactive.name}
                onchange={({ target }) => updateActorName(target.value)}
            />
        </label>

        <label class="bnd-monster-header-config__field">
            Creature Type

            <input
                class="bnd-sheet-input"
                type="text"
                value={actor.reactive.system.creatureType}
                onchange={({ target }) =>
                    actor.update({ "system.creatureType": target.value })}
            />
        </label>

        <label
            class="bnd-monster-header-config__field bnd-monster-header-config__field--challenge"
        >
            Challenge

            <input
                class="bnd-sheet-input"
                type="number"
                value={actor.reactive.system.challenge}
                onchange={({ target }) =>
                    actor.update({ "system.challenge": target.value })}
            />
        </label>
    </div>
</section>
