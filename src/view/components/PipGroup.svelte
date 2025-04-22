<script>
    let {
        disabled = false,
        flex = false,
        markedPips = 0,
        ghostPips = 0,
        pipCount = 0,
        onSelectPip,
    } = $props();
</script>

<div class="bnd-pip-group" class:bnd-pip-group--flex={flex}>
    {#each { length: pipCount }, i}
        {@const active = i < markedPips}

        <button
            class="bnd-pip-group__pip"
            aria-label="Toggle pip"
            type="button"
            {disabled}
            onclick={() => onSelectPip?.(i + 1)}
        >
            <i class="{active ? 'fa-solid' : 'fa-regular'} fa-square-full"></i>
        </button>
    {/each}

    {#each { length: ghostPips }}
        <button
            class="bnd-pip-group__pip bnd-pip-group__pip--ghost"
            aria-label="Toggle pip"
            type="button"
            disabled
        >
            <i class="fa-regular fa-square-full"></i>
        </button>
    {/each}
</div>
