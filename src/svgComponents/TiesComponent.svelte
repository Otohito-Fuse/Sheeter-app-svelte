<script lang="ts">
    import { clefWidth, keySignatureWidthUnit, timeSignatureWidth, viewBoxWidth, xLeftMargin, xRightMargin, yFirstStave, yLineInterval, yStaveInterval } from "../config/lengths";
    import type { Tie } from "../module/classes";
    import TieComponent from "./TieComponent.svelte";

    export let i: number;
    export let j: number;
    export let ties: Array<Tie>
    export let numOfBars: number;
    export let numOfKeySignatures: number;
    export let timeSignatureNumer: number;
    export let timeSignatureDenom: number;

    $: yMiddle = yFirstStave + yStaveInterval * i;

    $: calcXLeftEnd = (k: number) => {
        if (timeSignatureNumer == 0 && timeSignatureDenom == 0) {
            return xLeftMargin + clefWidth + numOfKeySignatures * keySignatureWidthUnit + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin - numOfKeySignatures * keySignatureWidthUnit) * k / numOfBars;
        } else {
            return xLeftMargin + clefWidth + numOfKeySignatures * keySignatureWidthUnit + timeSignatureWidth + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin - numOfKeySignatures * keySignatureWidthUnit - timeSignatureWidth) * k / numOfBars;
        }
    }

    $: calcX = (xRel: number) => (calcXLeftEnd(j) + (calcXLeftEnd(j + 1) - calcXLeftEnd(j)) * xRel);

    $: xGap = yLineInterval * 0.5;
</script>

{#each ties as { xRelFrom, xRelTo, yRel, isUpward }}
    <TieComponent xFrom={calcX(xRelFrom) + xGap} xTo={calcX(xRelTo) - xGap} y={yMiddle - (yRel + (isUpward ? 1.25 : -1.25)) * yLineInterval / 2} {isUpward} />
{/each}