<script>
import getRollResultLabel from '../dataPreparationHelpers/getRollResultLabel.ts';
import getRollSummaryLabel from '../dataPreparationHelpers/getRollSummaryLabel.ts';
import getSetbackLabel from '../dataPreparationHelpers/getSetbackLabel.ts';
import { setContext } from 'svelte';

import CardHeader from './components/CardHeader.svelte';

function determineRerollButtonVisibility() {
	const difficultyThreshold = DIFFICULTY_LEVELS.get(system.difficulty);

	if (system.rerolled) return false;
	if (system.setback) return false;
	if (difficultyThreshold && system.successes >= difficultyThreshold) return false;

	return true;
}

const { messageDocument } = $props();
const { system, rolls } = messageDocument;
const { DIFFICULTY_LEVELS } = CONFIG.BLOOD_AND_DOOM;
const difficultyLevel = DIFFICULTY_LEVELS.get(system.difficulty) ?? 0;

let rollSummary = getRollSummaryLabel(system.successes, difficultyLevel);
let rollResult = getRollResultLabel(system.successes, difficultyLevel);
let showRerollButton = determineRerollButtonVisibility();
let setbackLabel = getSetbackLabel(system.setback, system.successes, difficultyLevel);

setContext('messageDocument', messageDocument);
</script>

<article class="bnd-chat-card__body bnd-chat-card__body--action">
    <CardHeader />

    <h3 class="bnd-heading bnd-heading--chat-title">
        Action Roll

        {#if showRerollButton}
            <button
                class="bnd-roll-button"
                type="button"
                aria-label="Expend Blood Point to reroll"
                data-tooltip="Expend Blood Point to Reroll"
                onclick={() => messageDocument.reroll()}
            >
                <i class="fa-solid fa-dice"></i>
            </button>
        {/if}
    </h3>

    <div class="bnd-chat-card__result-wrapper">
        <div class="bnd-chat-card__result">
            {rollSummary}
        </div>
    </div>

    {#if difficultyLevel || system.setback || system.rerolled}
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

            {#if (difficultyLevel && system.setback) || (difficultyLevel && system.rerolled)}
                <span class="bnd-chat-card__result-divider"> | </span>
            {/if}

            {#if system.setback}
                <div
                    class="bnd-chat-card__result bnd-chat-card__result--uppercase bnd-chat-card__result--setback"
                >
                    {setbackLabel}
                </div>
            {/if}

            {#if system.rerolled}
                <div
                    class="bnd-chat-card__result bnd-chat-card__result--uppercase bnd-chat-card__result--rerolled"
                >
                    Rerolled
                </div>
            {/if}
        </div>
    {/if}
</article>

<style>
    .bnd-heading--chat-title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .bnd-roll-button {
            height: 100%;
            width: fit-content;
            margin: 0;
            padding: 0.25rem 0.375rem;
            background-color: rgba(0, 0, 0, 0.6)
        }
    }
</style>
