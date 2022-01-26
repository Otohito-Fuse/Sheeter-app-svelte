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

    const rx: number = yLineInterval * 0.37894733 * 1.9;
    const ry: number = yLineInterval * 0.2542448 * 1.9;

    $: cx = xLeftEnd + xRel * (xRightEnd - xLeftEnd);
    $: cy = yMiddle - (yRel / 2) * yLineInterval;
</script>

<ellipse
    style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
    {cx}
    {cy}
    {rx}
    {ry}
    transform="rotate(-25, {cx}, {cy})"
/>
<DotsComponent xFirstDotAbs={cx + xFirstDot} {dots} {yRel} {yMiddle} />
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
