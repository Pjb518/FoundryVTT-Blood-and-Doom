<script lang="ts">
    import { onDestroy } from "svelte";
    import { fade, slide } from "svelte/transition";

    import Combatant from "./components/Combatant.svelte";
    import type { BloodAndDoomCombat } from "../../documents/combat/combat.svelte.ts";

    const createCombat = Hooks.on("createCombat", (combat) => {
        currentCombat = (game.combat as BloodAndDoomCombat) ?? null;
    });

    const deleteCombat = Hooks.on("deleteCombat", (combat) => {
        currentCombat = (game.combat as BloodAndDoomCombat) ?? null;
    });

    const renderSceneNavigation = Hooks.on("renderSceneNavigation", () => {
        currentCombat = (game.combat as BloodAndDoomCombat) ?? null;
    });

    onDestroy(() => {
        Hooks.off("createCombat", createCombat);
        Hooks.off("deleteCombat", deleteCombat);
        Hooks.off("renderSceneNavigation", renderSceneNavigation);
    });

    let currentCombat: BloodAndDoomCombat | null = $state(game.combat);
</script>

<ol class="bnd-combat-tracker">
    {#each currentCombat?.reactive?.turns as combatant, index (combatant._id)}
        {#if combatant.visible}
            <li class="bnd-combat-tracker__item">
                <Combatant {combatant} />
            </li>
        {/if}
    {/each}
</ol>
