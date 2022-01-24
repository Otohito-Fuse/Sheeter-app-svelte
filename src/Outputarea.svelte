<script lang="ts">
    import type { Stave } from './module/classes';
    import { viewBoxHeight, viewBoxWidth, yTitle, yFirstStave, yStaveInterval, xLeftMargin, clefWidth, xRightMargin, keySignatureWidthUnit, timeSignatureWidth } from './config/lengths';
    import StaveComponent from './svgComponents/StaveComponent.svelte';
    import NoteHeadQComponent from './svgComponents/NoteHeadQComponent.svelte';
    import NoteHeadHComponent from './svgComponents/NoteHeadHComponent.svelte';
    import NoteHeadWComponent from './svgComponents/NoteHeadWComponent.svelte';

    export let width: number;
    $: height = width * viewBoxHeight / viewBoxWidth;

    export let staves: Array<Stave>;
    export let title: string;

    $: calcXLeftEnd = (j: number, bars: number, numOfKeySignatures: number, timeSignatureNumer: number, timeSignatureDenom: number) => {
        if (timeSignatureNumer == 0 && timeSignatureDenom == 0) {
            return xLeftMargin + clefWidth + numOfKeySignatures * keySignatureWidthUnit + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin - numOfKeySignatures * keySignatureWidthUnit) * j / bars;
        } else {
            return xLeftMargin + clefWidth + numOfKeySignatures * keySignatureWidthUnit + timeSignatureWidth + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin - numOfKeySignatures * keySignatureWidthUnit - timeSignatureWidth) * j / bars;
        }
    }
</script>

<svg {height} {width} viewBox="0 0 {viewBoxWidth} {viewBoxHeight}" preserveAspectRatio="xMidYMin">
    <!-- Title -->
    <text x={viewBoxWidth / 2} y={yTitle} font-size="80" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif">
        {title}
    </text>

    <!-- Staves -->
    {#each staves as stave, i}
        {#if i != staves.length - 1}
            <StaveComponent yMiddle={yFirstStave + yStaveInterval * i} numOfBars={stave.bars.length} isLastStave={false} timeSignatureNumer={stave.timeSignatureNumer} timeSignatureDenom={stave.timeSignatureDenom} keySignature={stave.keySignature} />
        {:else}
            <StaveComponent yMiddle={yFirstStave + yStaveInterval * i} numOfBars={stave.bars.length} isLastStave={true} timeSignatureNumer={stave.timeSignatureNumer} timeSignatureDenom={stave.timeSignatureDenom} keySignature={stave.keySignature} />
        {/if}
        {#each stave.bars as bar, j}
            {#each bar.noteHeads as { xRel, yRel, noteHeadType, dots, accidental }}
                {#if noteHeadType == "whole"}
                    <NoteHeadWComponent {xRel} xLeftEnd={calcXLeftEnd(j, stave.bars.length, Math.abs(stave.keySignature), stave.timeSignatureNumer, stave.timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, stave.bars.length, Math.abs(stave.keySignature), stave.timeSignatureNumer, stave.timeSignatureDenom)} {yRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} {accidental} />
                {:else if noteHeadType == "half"}
                    <NoteHeadHComponent {xRel} xLeftEnd={calcXLeftEnd(j, stave.bars.length, Math.abs(stave.keySignature), stave.timeSignatureNumer, stave.timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, stave.bars.length, Math.abs(stave.keySignature), stave.timeSignatureNumer, stave.timeSignatureDenom)} {yRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} {accidental} />
                {:else}
                    <NoteHeadQComponent {xRel} xLeftEnd={calcXLeftEnd(j, stave.bars.length, Math.abs(stave.keySignature), stave.timeSignatureNumer, stave.timeSignatureDenom)} xRightEnd={calcXLeftEnd(j + 1, stave.bars.length, Math.abs(stave.keySignature), stave.timeSignatureNumer, stave.timeSignatureDenom)} {yRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} {accidental} />
                {/if}
            {/each}
        {/each}
    {/each}
</svg>

<style>
</style>