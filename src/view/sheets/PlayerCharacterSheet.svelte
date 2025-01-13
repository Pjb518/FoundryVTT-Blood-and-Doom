<script>
    import { setContext } from "svelte";

    import PlayerCharacterHeader from "#view/sheets/components/PlayerCharacterHeader.svelte";
    import PlayerCharacterPage1 from "#view/sheets/pages/PlayerCharacterPage1.svelte";
    import PlayerCharacterPage2 from "#view/sheets/pages/PlayerCharacterPage2.svelte";
    import PlayerCharacterPage3 from "#view/sheets/pages/PlayerCharacterPage3.svelte";

    const tabs = {
        page1: {
            label: "Page 1",
            component: PlayerCharacterPage1,
        },
        page2: {
            label: "Page 2",
            component: PlayerCharacterPage2,
        },
        page3: {
            label: "Page 3",
            component: PlayerCharacterPage3,
        },
    };

    let { actor, sheet } = $props();

    let currentTab = $state(tabs.page1);

    setContext("actor", actor);
    setContext("sheet", sheet);
</script>

<PlayerCharacterHeader />

<nav class="bnd-nav">
    <ol class="bnd-nav-list">
        {#each Object.entries(tabs) as [key, tab]}
            <li class="bnd-nav-list__item">
                <button
                    class="bnd-nav-list__button"
                    type="button"
                    class:bnd-nav-list__button--active={currentTab.label === tab.label}
                    onclick={() => (currentTab = tabs[key])}>{tab.label}</button
                >
            </li>
        {/each}
    </ol>
</nav>

<currentTab.component />
