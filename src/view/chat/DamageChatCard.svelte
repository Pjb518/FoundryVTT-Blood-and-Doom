<script>
    import { setContext } from "svelte";

    import CardHeader from "./components/CardHeader.svelte";

    const { messageDocument } = $props();
    const { rolls } = messageDocument;

    setContext("messageDocument", messageDocument);
</script>

<article class="bnd-chat-card__body bnd-chat-card__body--damage">
    <CardHeader />

    <h3 class="bnd-heading bnd-heading--chat-title">Damage Roll</h3>

    <div class="bnd-chat-card__result-wrapper">
        <div class="bnd-chat-card__result">
            {rolls[0].total} Damage
        </div>
    </div>
</article>
