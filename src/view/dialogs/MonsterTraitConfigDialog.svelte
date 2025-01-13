<script>
    import Editor from "#view/components/Editor.svelte";

    let { actor, trait } = $props();
</script>

<section class="bnd-sheet__body bnd-sheet__body--monster-trait-config">
    <div class="bnd-box bnd-box--padded">
        {#key actor.reactive.system[trait]}
            <Editor
                field="system.{trait}"
                content={actor.reactive.system[trait]}
                document={actor}
                editorOptions={{ toggled: false }}
            />
        {/key}
    </div>
</section>
