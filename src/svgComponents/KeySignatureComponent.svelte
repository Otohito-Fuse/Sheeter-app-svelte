<script lang="ts">
    import FlatComponent from "./FlatComponent.svelte";
    import SharpComponent from "./SharpComponent.svelte";
    import { keySignatureArrayFlat, keySignatureArraySharp, keySignatureWidthUnit, yLineInterval } from "../config/lengths";

    export let xLeftEnd: number;
    export let yMiddle: number;
    export let keySignature: number;
</script>

{#if keySignature > 0 && keySignature <= 7}
    {#each Array(keySignature) as _, i}
        <FlatComponent scaleRatio={1} cx={xLeftEnd + keySignatureWidthUnit * (2 * i + 1) / 2} cy={yMiddle - keySignatureArrayFlat[i] * yLineInterval / 2} />
    {/each}
{/if}

{#if keySignature < 0 && keySignature >= -7}
    {#each Array(-keySignature) as _, i}
        <SharpComponent scaleRatio={1} cx={xLeftEnd + keySignatureWidthUnit * (2 * i + 1) / 2} cy={yMiddle - keySignatureArraySharp[i] * yLineInterval / 2} />
    {/each}
{/if}