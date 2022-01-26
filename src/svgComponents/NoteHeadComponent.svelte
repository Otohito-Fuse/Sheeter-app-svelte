<script lang="ts">
    import { clefWidth, keySignatureWidthUnit, timeSignatureWidth, viewBoxWidth, xLeftMargin, xRightMargin, yFirstStave, yStaveInterval } from "../config/lengths";
    import type { Accidental, NoteHeadType } from "../module/classes";
    import NoteHeadHComponent from "./NoteHeadHComponent.svelte";
    import NoteHeadQComponent from "./NoteHeadQComponent.svelte";
    import NoteHeadWComponent from "./NoteHeadWComponent.svelte";


    export let noteHeadType: NoteHeadType;
    export let xRel: number;
    export let yRel: number;
    export let dots: number;
    export let accidental: Accidental;
    export let i: number;
    export let j: number;
    export let numOfBars: number;
    export let numOfKeySignatures: number;
    export let timeSignatureNumer: number;
    export let timeSignatureDenom: number;

    $: calcXLeftEnd = (j: number, bars: number, numOfKeySignatures: number, timeSignatureNumer: number, timeSignatureDenom: number) => {
        if (timeSignatureNumer == 0 && timeSignatureDenom == 0) {
            return xLeftMargin + clefWidth + numOfKeySignatures * keySignatureWidthUnit + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin - numOfKeySignatures * keySignatureWidthUnit) * j / bars;
        } else {
            return xLeftMargin + clefWidth + numOfKeySignatures * keySignatureWidthUnit + timeSignatureWidth + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin - numOfKeySignatures * keySignatureWidthUnit - timeSignatureWidth) * j / bars;
        }
    }
</script>

{#if noteHeadType == "whole"}
    <NoteHeadWComponent {xRel} xLeftEnd={calcXLeftEnd(j, numOfBars, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, numOfBars, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} {yRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} {accidental} />
{:else if noteHeadType == "half"}
    <NoteHeadHComponent {xRel} xLeftEnd={calcXLeftEnd(j, numOfBars, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, numOfBars, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} {yRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} {accidental} />
{:else}
    <NoteHeadQComponent {xRel} xLeftEnd={calcXLeftEnd(j, numOfBars, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, numOfBars, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} {yRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} {accidental} />
{/if}