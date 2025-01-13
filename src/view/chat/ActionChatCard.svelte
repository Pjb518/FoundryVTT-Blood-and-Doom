<script>
    import getRollResultLabel from "../dataPreparationHelpers/getRollResultLabel.ts";
    import getRollSummaryLabel from "../dataPreparationHelpers/getRollSummaryLabel.ts";
    import getSetBackLabel from "../dataPreparationHelpers/getSetBackLabel.ts";
    import { setContext } from "svelte";

    import CardHeader from "./components/CardHeader.svelte";

    const { messageDocument } = $props();
    const { system, rolls } = messageDocument;
    const { DIFFICULTY_LEVELS } = CONFIG.BLOOD_AND_DOOM;
    const difficultyLevel = DIFFICULTY_LEVELS.get(system.difficulty) ?? 0;

    let rollSummary = getRollSummaryLabel(system.successes, difficultyLevel);
    let rollResult = getRollResultLabel(system.successes, difficultyLevel);
    let setbackLabel = getSetBackLabel(system.setback, system.successes, difficultyLevel);

    setContext("messageDocument", messageDocument);
</script>

<article class="bnd-chat-card__body bnd-chat-card__body--action">
    <CardHeader />

    <h3 class="bnd-heading bnd-heading--chat-title">Action Roll</h3>

    <div class="bnd-chat-card__result-wrapper">
        <div class="bnd-chat-card__result">
            {rollSummary}
        </div>
    </div>

    {#if difficultyLevel || system.setback}
        <div class="bnd-chat-card__result-wrapper">
            {#if difficultyLevel}
                <div
                    class="bnd-chat-card__result bnd-chat-card__result--uppercase"
                    class:bnd-chat-card__result--success={system.successes >=
                        difficultyLevel}
                    class:bnd-chat-card__result--failure={system.successes <
                        difficultyLevel}
                >
                    {rollResult}
                </div>
            {/if}

            {#if difficultyLevel && system.setback}
                <span class="bnd-chat-card__result-divider"> | </span>
            {/if}

            {#if system.setback}
                <div
                    class="bnd-chat-card__result bnd-chat-card__result--uppercase bnd-chat-card__result--setback"
                >
                    {setbackLabel}
                </div>
            {/if}
        </div>
    {/if}
</article>
