<script lang="ts">
    import { clefWidth, keySignatureWidthUnit, timeSignatureWidth, viewBoxWidth, xLeftMargin, xRightMargin, yChordHeight, yFirstStave, yStaveInterval } from "../config/lengths";

    import type { ChordPlaceHolder } from "../module/chordParser";

    export let xRel: number;
    export let i: number;
    export let j: number;
    export let chordPlaceHolder: ChordPlaceHolder;
    export let staveBarsLength: number;
    export let numOfKeySignatures: number;
    export let timeSignatureNumer: number;
    export let timeSignatureDenom: number;

    $: calcX = (j: number, bars: number, numOfKeySignatures: number, timeSignatureNumer: number, timeSignatureDenom: number) => {
        if (timeSignatureNumer == 0 && timeSignatureDenom == 0) {
            let xLeft: number = xLeftMargin + clefWidth + numOfKeySignatures * keySignatureWidthUnit + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin - numOfKeySignatures * keySignatureWidthUnit) * j / bars;
            let barWidth: number = (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin - numOfKeySignatures * keySignatureWidthUnit) / bars
            return xLeft + barWidth * xRel;
        } else {
            let xLeft: number = xLeftMargin + clefWidth + numOfKeySignatures * keySignatureWidthUnit + timeSignatureWidth + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin - numOfKeySignatures * keySignatureWidthUnit - timeSignatureWidth) * j / bars;
            let barWidth: number = (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin - numOfKeySignatures * keySignatureWidthUnit - timeSignatureWidth) / bars
            return xLeft + barWidth * xRel;
        }
    }

    $: x = calcX(j, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom);
    $: y = yFirstStave + yStaveInterval * i - yChordHeight;
</script>

{#if chordPlaceHolder == "%"}
<text></text>
{:else if chordPlaceHolder == "/"}
<text {x} {y} font-size="30" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif">
    /
</text>
{:else}
<text {x} {y} font-size="30" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif">
    {chordPlaceHolder.noteSymbol}{chordPlaceHolder.suffix1}{chordPlaceHolder.suffix2}
</text>
{/if}