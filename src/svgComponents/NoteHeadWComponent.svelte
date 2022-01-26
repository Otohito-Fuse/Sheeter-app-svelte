<script lang="ts">
    export let xRel: number;
    export let xLeftEnd: number;
    export let xRightEnd: number;
    export let yRel: number;
    export let yMiddle: number;
    export let dots: number;
    export let accidental: Accidental;

    import {
        yLineInterval,
        xFirstDot,
        accidentalDistance,
    } from "../config/lengths";
    import DotsComponent from "./DotsComponent.svelte";
    import LedgerLineComponent from "./LedgerLineComponent.svelte";
    import type { Accidental } from "../module/classes";
    import FlatComponent from "./FlatComponent.svelte";
    import SharpComponent from "./SharpComponent.svelte";
    import DoubleFlatComponent from "./DoubleFlatComponent.svelte";
    import NaturalComponent from "./NaturalComponent.svelte";

    $: cx = xLeftEnd + xRel * (xRightEnd - xLeftEnd);
    $: cy = yMiddle - (yRel / 2) * yLineInterval;

    $: scale = yLineInterval / 50;
</script>

<path
    style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
    d="m 13.892908,-28.044092 a 25.930325,43.088662 71.838869 0 0 -26.353503,5.001244 25.930325,43.088662 71.838869 0 0 -27.368094,39.057558 25.930325,43.088662 71.838869 0 0 52.289316,7.02748 25.930325,43.088662 71.838869 0 0 27.368091,-39.05756 25.930325,43.088662 71.838869 0 0 -25.93581,-12.028722
        z
        m -13.8931951631,5.461682 a 18.880068,22.582411 0 0 1 18.8804321631,22.58208337714 18.880068,22.582411 0 0 1 -18.8804321631,22.58259662286 18.880068,22.582411 0 0 1 -18.8798378369,-22.58259662286 18.880068,22.582411 0 0 1 18.8798378369,-22.58208337714
        z"
    transform="scale({scale}) translate({cx / scale} {cy / scale})"
/>
<DotsComponent xFirstDotAbs={cx + xFirstDot * 1.1} {dots} {yRel} {yMiddle} />
<LedgerLineComponent {cx} {yMiddle} {yRel} />
{#if accidental == "flat"}
    <FlatComponent cx={cx - accidentalDistance} {cy} scaleRatio={1} />
{/if}
{#if accidental == "sharp"}
    <SharpComponent cx={cx - accidentalDistance} {cy} scaleRatio={1} />
{/if}
{#if accidental == "double flat"}
    <DoubleFlatComponent cx={cx - accidentalDistance} {cy} scaleRatio={1} />
{/if}
{#if accidental == "natural"}
    <NaturalComponent cx={cx - accidentalDistance} {cy} scaleRatio={1} />
{/if}
