<script>
    import Editor from "#view/components/Editor.svelte";

    async function updateItemName(newName) {
        await item.update({ name: newName });
        sheet.updateTitle(newName);
    }

    let { item, sheet } = $props();
</script>

<section class="bnd-sheet__body">
    <div class="bnd-misc-object-config bnd-box bnd-box--padded">
        <label class="bnd-misc-object-config__field">
            <h2 class="bnd-misc-object-config__field-label">Name</h2>

            <input
                class="bnd-sheet-input"
                type="text"
                value={item.reactive.name}
                onchange={({ target }) => updateItemName(target.value)}
            />
        </label>

        <label
            class="bnd-misc-object-config__field bnd-misc-object-config__field--description"
        >
            <h2
                class="bnd-misc-object-config__field-label bnd-misc-object-config__field-label--description"
            >
                Description
            </h2>

            {#key item.reactive.system.description}
                <Editor
                    field="system.description"
                    content={item.reactive.system.description}
                    document={item}
                />
            {/key}
        </label>
    </div>
</section>
