<script>
    import getRollResultLabel from "../dataPreparationHelpers/getRollResultLabel.ts";
    import getRollSummaryLabel from "../dataPreparationHelpers/getRollSummaryLabel.ts";
    import getSetbackLabel from "../dataPreparationHelpers/getSetbackLabel.ts";
    import { setContext } from "svelte";

    import CardHeader from "./components/CardHeader.svelte";

    const { messageDocument } = $props();
    const { system, rolls } = messageDocument;
    const difficultyLevel = 2;

    let rollSummary = getRollSummaryLabel(system.successes, null);
    let rollResult = getRollResultLabel(system.successes, difficultyLevel, true);
    let setbackLabel = getSetbackLabel(system.setback, system.successes, difficultyLevel);

    setContext("messageDocument", messageDocument);
</script>

<article class="bnd-chat-card__body bnd-chat-card__body--doom">
    <CardHeader />

    <h3 class="bnd-heading bnd-heading--chat-title">Doom Roll</h3>

    <div class="bnd-chat-card__result-wrapper">
        <div class="bnd-chat-card__result">
            {rollSummary}
        </div>
    </div>

    <div class="bnd-chat-card__result-wrapper">
        <div
            class="bnd-chat-card__result bnd-chat-card__result--uppercase"
            class:bnd-chat-card__result--success={system.successes >= difficultyLevel}
            class:bnd-chat-card__result--failure={system.successes < difficultyLevel}
        >
            {rollResult}
        </div>

        {#if system.setback}
            <span class="bnd-chat-card__result-divider"> | </span>

            <div
                class="bnd-chat-card__result bnd-chat-card__result--uppercase bnd-chat-card__result--setback"
            >
                {setbackLabel}
            </div>
        {/if}
    </div>
</article>
