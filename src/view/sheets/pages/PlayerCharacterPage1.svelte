<script>
    import PlayerCharacterAbilities from "#view/sheets/components/PlayerCharacterAbilities.svelte";
    import PlayerCharacterDefenses from "#view/sheets/components/PlayerCharacterDefenses.svelte";
    import PlayerCharacterEquipment from "#view/sheets/components/PlayerCharacterEquipment.svelte";
    import PlayerCharacterHealth from "#view/sheets/components/PlayerCharacterHealth.svelte";
    import PlayerCharacterKnowledge from "#view/sheets/components/PlayerCharacterKnowledge.svelte";
    import PlayerCharacterMagic from "#view/sheets/components/PlayerCharacterMagic.svelte";
    import PlayerCharacterPowers from "#view/sheets/components/PlayerCharacterPowers.svelte";
    import PlayerCharacterResolve from "#view/sheets/components/PlayerCharacterResolve.svelte";
</script>

<section class="bnd-sheet__body bnd-sheet__body--player-character-page-1">
    <PlayerCharacterHealth />
    <PlayerCharacterResolve />
    <PlayerCharacterDefenses />
    <PlayerCharacterAbilities />
    <PlayerCharacterKnowledge />
    <PlayerCharacterMagic />
    <PlayerCharacterEquipment />
    <PlayerCharacterPowers />
</section>
