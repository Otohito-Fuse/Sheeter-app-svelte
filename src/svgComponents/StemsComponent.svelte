<script lang="ts">
    import {
        clefWidth,
        keySignatureWidthUnit,
        timeSignatureWidth,
        viewBoxWidth,
        xGapBetweenNoteheadAndStem,
        xLeftMargin,
        xRightMargin,
        yFirstStave,
        yGapBetweenNoteheadAndStem,
        yLineInterval,
        yStaveInterval,
    } from "../config/lengths";
    import type { Stem } from "../module/classes";
    import StemComponent from "./StemComponent.svelte";

    export let i: number;
    export let j: number;
    export let stems: Array<Stem>;
    export let numOfBars: number;
    export let numOfKeySignatures: number;
    export let timeSignatureNumer: number;
    export let timeSignatureDenom: number;

    $: yMiddle = yFirstStave + yStaveInterval * i;

    $: calcXLeftEnd = (k: number) => {
        if (timeSignatureNumer == 0 && timeSignatureDenom == 0) {
            return (
                xLeftMargin +
                clefWidth +
                numOfKeySignatures * keySignatureWidthUnit +
                ((viewBoxWidth -
                    xLeftMargin -
                    clefWidth -
                    xRightMargin -
                    numOfKeySignatures * keySignatureWidthUnit) *
                    k) /
                    numOfBars
            );
        } else {
            return (
                xLeftMargin +
                clefWidth +
                numOfKeySignatures * keySignatureWidthUnit +
                timeSignatureWidth +
                ((viewBoxWidth -
                    xLeftMargin -
                    clefWidth -
                    xRightMargin -
                    numOfKeySignatures * keySignatureWidthUnit -
                    timeSignatureWidth) *
                    k) /
                    numOfBars
            );
        }
    };

    $: calcX = (xRel: number) =>
        calcXLeftEnd(j) + (calcXLeftEnd(j + 1) - calcXLeftEnd(j)) * xRel;

    $: calcY = (yRel: number) => yMiddle - (yRel * yLineInterval) / 2;
</script>

{#each stems as { xRel, yRelHead, yRelFlag, flagType }}
    {#if yRelFlag > yRelHead}
        <StemComponent
            x={calcX(xRel) + xGapBetweenNoteheadAndStem}
            yHead={calcY(yRelHead) - yGapBetweenNoteheadAndStem}
            yFlag={calcY(yRelFlag)}
            {flagType}
        />
    {:else}
        <StemComponent
            x={calcX(xRel) - xGapBetweenNoteheadAndStem}
            yHead={calcY(yRelHead) + yGapBetweenNoteheadAndStem}
            yFlag={calcY(yRelFlag)}
            {flagType}
        />
        />
    {/if}
{/each}
