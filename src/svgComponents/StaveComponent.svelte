<script lang="ts">
    export let yMiddle: number;
    export let numOfBars: number;
    export let doubleBarArray: Array<boolean>;
    export let endBarArray: Array<boolean>;
    export let timeSignatureNumer: number;
    export let timeSignatureDenom: number;
    export let keySignature: number;

    import {
        viewBoxWidth,
        xLeftMargin,
        xRightMargin,
        yLineInterval,
        lineWidth,
        clefWidth,
        barWidth,
        doubleBarInterval,
        keySignatureWidthUnit,
        timeSignatureWidth,
    } from "../config/lengths";
    import KeySignatureComponent from "./KeySignatureComponent.svelte";
    import TimeSignatureComponent from "./TimeSignatureComponent.svelte";
    import TrebleClefComponent from "./TrebleClefComponent.svelte";

    $: xNthBar = (i: number) => {
        if (timeSignatureNumer != 0 && timeSignatureDenom != 0) {
            return (
                xLeftMargin +
                clefWidth +
                Math.abs(keySignature) * keySignatureWidthUnit +
                timeSignatureWidth +
                ((viewBoxWidth -
                    xLeftMargin -
                    xRightMargin -
                    clefWidth -
                    Math.abs(keySignature) * keySignatureWidthUnit -
                    timeSignatureWidth) /
                    numOfBars) *
                    (i + 1)
            );
        } else {
            return (
                xLeftMargin +
                clefWidth +
                Math.abs(keySignature) * keySignatureWidthUnit +
                ((viewBoxWidth -
                    xLeftMargin -
                    xRightMargin -
                    clefWidth -
                    Math.abs(keySignature) * keySignatureWidthUnit) /
                    numOfBars) *
                    (i + 1)
            );
        }
    };
</script>

{#each Array(5) as _, i}
    <line
        x1={xLeftMargin}
        y1={yMiddle + (i - 2) * yLineInterval}
        x2={viewBoxWidth - xRightMargin}
        y2={yMiddle + (i - 2) * yLineInterval}
        stroke="black"
        stroke-width={lineWidth}
    />
{/each}
{#each Array(numOfBars) as _, i}
    {#if endBarArray[i]}
        <line
            x1={xNthBar(i)}
            y1={yMiddle - 2 * yLineInterval - lineWidth / 2}
            x2={xNthBar(i)}
            y2={yMiddle + 2 * yLineInterval + lineWidth / 2}
            stroke="black"
            stroke-width={barWidth * 2}
        />
        <line
            x1={xNthBar(i) - doubleBarInterval}
            y1={yMiddle - 2 * yLineInterval - lineWidth / 2}
            x2={xNthBar(i) - doubleBarInterval}
            y2={yMiddle + 2 * yLineInterval + lineWidth / 2}
            stroke="black"
            stroke-width={barWidth}
        />
    {:else}
        <line
            x1={xNthBar(i)}
            y1={yMiddle - 2 * yLineInterval - lineWidth / 2}
            x2={xNthBar(i)}
            y2={yMiddle + 2 * yLineInterval + lineWidth / 2}
            stroke="black"
            stroke-width={barWidth}
        />
        {#if doubleBarArray[i]}
            <line
                x1={xNthBar(i) - doubleBarInterval}
                y1={yMiddle - 2 * yLineInterval - lineWidth / 2}
                x2={xNthBar(i) - doubleBarInterval}
                y2={yMiddle + 2 * yLineInterval + lineWidth / 2}
                stroke="black"
                stroke-width={barWidth}
            />
        {/if}
    {/if}
{/each}
<TrebleClefComponent cx={xLeftMargin + clefWidth / 2} {yMiddle} />
<KeySignatureComponent
    xLeftEnd={xLeftMargin + clefWidth}
    {yMiddle}
    {keySignature}
/>
<TimeSignatureComponent
    {timeSignatureNumer}
    {timeSignatureDenom}
    cx={xLeftMargin +
        clefWidth +
        Math.abs(keySignature) * keySignatureWidthUnit +
        timeSignatureWidth / 2}
    {yMiddle}
/>
