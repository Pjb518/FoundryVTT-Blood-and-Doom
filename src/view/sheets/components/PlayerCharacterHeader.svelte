<script>
    import { getContext } from "svelte";
    import PipGroup from "#view/components/PipGroup.svelte";

    async function updateActorName(newName) {
        await actor.update({ name: newName });
        sheet.updateTitle(newName);
    }

    async function updateBloodPoints(newValue) {
        let updateValue = newValue;

        if (actor.reactive.system.bloodPoints >= newValue) updateValue -= 1;

        actor.update({
            "system.bloodPoints": updateValue,
        });
    }

    async function updateDoomPoints(newValue) {
        let updateValue = newValue;

        if (actor.reactive.system.doomPoints >= newValue) updateValue -= 1;

        actor.update({
            "system.doomPoints": updateValue,
        });
    }

    async function updateMomentum(newValue) {
        let updateValue = newValue;

        if (actor.reactive.system.momentum >= newValue) updateValue -= 1;

        actor.update({
            "system.momentum": updateValue,
        });
    }

    let actor = getContext("actor");
    let sheet = getContext("sheet");
</script>

<header
    class="bnd-sheet__header bnd-sheet__header--player-character bnd-box"
    style="grid-area: header;"
>
    <label class="bnd-field" style="grid-area: name;">
        <h4 class="bnd-heading bnd-heading--centered bnd-heading--small">
            Character Name
        </h4>

        <input
            class="bnd-sheet-input"
            type="text"
            value={actor.reactive.name}
            onchange={({ target }) => updateActorName(target.value)}
        />
    </label>

    <div class="bnd-logo bnd-logo--sheet" style="grid-area: logo;"></div>

    <label class="bnd-field" style="grid-area: class;">
        <h4 class="bnd-heading bnd-heading--centered bnd-heading--small">Class</h4>

        <input
            class="bnd-sheet-input"
            type="text"
            value={actor.reactive.system.class}
            onchange={({ target }) => {
                actor.update({ "system.class": target.value });
            }}
        />
    </label>

    <div class="bnd-field bnd-field--pip-wrapper" style="grid-area: bloodPoints;">
        <h4 class="bnd-heading bnd-heading--centered">Blood Points</h4>

        <PipGroup
            pipCount="6"
            markedPips={actor.reactive.system.bloodPoints}
            onSelectPip={updateBloodPoints}
        />
    </div>

    <div class="bnd-field bnd-field--pip-wrapper" style="grid-area: momentum;">
        <h4 class="bnd-heading bnd-heading--centered">Momentum Pool</h4>

        <div class="bnd-field--momentum-wrapper">
            <div class="bnd-field--dummy-momentum-button" role="presentation">
                <i class="fa-solid fa-delete-left"></i>
            </div>

            <PipGroup
                flex={true}
                pipCount="3"
                markedPips={actor.reactive.system.momentum}
                onSelectPip={updateMomentum}
            />

            <button
                class="bnd-field--momentum-button"
                type="button"
                aria-label="Clear Momentum"
                data-tooltip="Clear Momentum"
                onclick={() => actor.update({ "system.momentum": 0 })}
            >
                <i class="fa-solid fa-delete-left"></i>
            </button>
        </div>
    </div>

    <div class="bnd-field bnd-field--pip-wrapper" style="grid-area: doomPoints;">
        <h4 class="bnd-heading bnd-heading--centered">Doom Points</h4>

        <PipGroup
            pipCount="6"
            markedPips={actor.reactive.system.doomPoints}
            onSelectPip={updateDoomPoints}
        />
    </div>
</header>
