<script lang="ts">
    import { clefWidth, keySignatureWidthUnit, timeSignatureWidth, viewBoxWidth, xLeftMargin, xRightMargin, yFirstStave, yStaveInterval } from "../config/lengths";

    import type { Rest, RestType } from "../module/classes";
    import RestEComponent from "./RestEComponent.svelte";
    import RestHComponent from "./RestHComponent.svelte";
    import RestQComponent from "./RestQComponent.svelte";
    import RestSComponent from "./RestSComponent.svelte";
    import RestWComponent from "./RestWComponent.svelte";

    export let restType: RestType;
    export let xRel: number;
    export let dots: number;
    export let i: number;
    export let j: number;
    export let rests: Array<Rest>
    export let staveBarsLength: number;
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


{#if restType == "whole"}
    {#if rests.length == 1}
        <RestWComponent xRel={0.5} yMiddle={yFirstStave + yStaveInterval * i} {dots} xLeftEnd={calcXLeftEnd(j, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} />
    {:else}
        <RestWComponent {xRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} xLeftEnd={calcXLeftEnd(j, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} />
    {/if}
{:else if restType == "half"}
    <RestHComponent {xRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} xLeftEnd={calcXLeftEnd(j, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} />
{:else if restType == "quarter"}
    <RestQComponent {xRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} xLeftEnd={calcXLeftEnd(j, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} />
{:else if restType == "eighth"}
    <RestEComponent {xRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} xLeftEnd={calcXLeftEnd(j, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} />
{:else}
    <RestSComponent {xRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} xLeftEnd={calcXLeftEnd(j, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, staveBarsLength, numOfKeySignatures, timeSignatureNumer, timeSignatureDenom)} />
{/if}