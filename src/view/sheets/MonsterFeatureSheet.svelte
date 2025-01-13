<script>
    import Editor from "#view/components/Editor.svelte";

    async function updateFeatureName(newName) {
        await feature.update({ name: newName });
        sheet.updateTitle(newName);
    }

    let { feature, sheet } = $props();
</script>

<section class="bnd-sheet__body bnd-sheet__body--monster-feature">
    <div class="bnd-monster-feature-config bnd-box bnd-box--padded">
        <label class="bnd-monster-feature-config__field">
            <h2 class="bnd-monster-feature-config__field-label">Name</h2>

            <input
                class="bnd-sheet-input"
                type="text"
                value={feature.reactive.name}
                onchange={({ target }) => updateFeatureName(target.value)}
            />
        </label>

        <label
            class="bnd-monster-feature-config__field bnd-monster-feature-config__field--description"
        >
            <h2
                class="bnd-monster-feature-config__field-label bnd-monster-feature-config__field-label--description"
            >
                Description
            </h2>

            {#key feature.reactive.system.description}
                <Editor
                    field="system.description"
                    content={feature.reactive.system.description}
                    document={feature}
                />
            {/key}
        </label>
    </div>
</section>
