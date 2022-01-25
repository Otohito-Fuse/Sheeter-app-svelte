<script lang="ts">
    import type { Accidental, NoteSymbol } from "../module/classes";

    export let scale: number;
    export let noteSymbol: NoteSymbol;
    export let accidental: Accidental;
    export let x: number;
    export let y: number;
</script>

{#if accidental == "none"}
{:else if accidental == "flat"}
{:else if accidental == "double flat"}
{:else if accidental == "sharp"}
{:else if accidental == "double sharp"}
{/if}