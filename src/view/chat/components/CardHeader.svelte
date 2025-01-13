<script>
    import { getContext } from "svelte";

    const messageDocument = getContext("messageDocument");
    const cardAuthor = messageDocument.author.name;
</script>

<header class="bnd-chat-card__header">
    <span>{cardAuthor}</span>

    <time class="message-timestamp">
        {foundry.utils.timeSince(messageDocument.timestamp)}
    </time>

    <button
        aria-label="Delete"
        class="bnd-chat-card__header-button bnd-u-unstyled-button message-delete"
        onclick={() => messageDocument.delete()}
    >
        <i class="fas fa-trash"></i>
    </button>
</header>
