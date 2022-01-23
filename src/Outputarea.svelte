<script lang="ts">
    import type { Bar, NoteHead, Stave } from './module/classes';
    import { viewBoxHeight, viewBoxWidth, yTitle, yFirstStave, yStaveInterval, xLeftMargin, clefWidth, xRightMargin } from './config/lengths';
    import StaveComponent from './svgComponents/StaveComponent.svelte';
    import NoteHeadQComponent from './svgComponents/NoteHeadQComponent.svelte';
    import NoteHeadHComponent from './svgComponents/NoteHeadHComponent.svelte';
    import NoteHeadWComponent from './svgComponents/NoteHeadWComponent.svelte';

    export let width: number;
    $: height = width * viewBoxHeight / viewBoxWidth;

    export let staves: Array<Stave>;
    export let title: string;
</script>

<svg {height} {width} viewBox="0 0 {viewBoxWidth} {viewBoxHeight}" preserveAspectRatio="xMidYMin">
    <!-- Title -->
    <text x={viewBoxWidth / 2} y={yTitle} font-size="80" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif">
        {title}
    </text>

    <!-- Staves -->
    {#each staves as stave, i}
        {#if i != staves.length - 1}
            <StaveComponent yMiddle={yFirstStave + yStaveInterval * i} numOfBars={stave.bars.length} isLastStave={false} />
        {:else}
            <StaveComponent yMiddle={yFirstStave + yStaveInterval * i} numOfBars={stave.bars.length} isLastStave={true} />
        {/if}
        {#each stave.bars as bar, j}
            {#each bar.noteHeads as { xRel, yRel, noteHeadType, dots }}
                {#if noteHeadType == "whole"}
                    <NoteHeadWComponent {xRel} xLeftEnd={xLeftMargin + clefWidth + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin) * j / stave.bars.length} xRightEnd={xLeftMargin + clefWidth + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin) * (j + 1) / stave.bars.length} {yRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} />
                {:else if noteHeadType == "half"}
                    <NoteHeadHComponent {xRel} xLeftEnd={xLeftMargin + clefWidth + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin) * j / stave.bars.length} xRightEnd={xLeftMargin + clefWidth + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin) * (j + 1) / stave.bars.length} {yRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} />
                {:else}
                    <NoteHeadQComponent {xRel} xLeftEnd={xLeftMargin + clefWidth + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin) * j / stave.bars.length} xRightEnd={xLeftMargin + clefWidth + (viewBoxWidth - xLeftMargin - clefWidth - xRightMargin) * (j + 1) / stave.bars.length} {yRel} yMiddle={yFirstStave + yStaveInterval * i} {dots} />
                {/if}
            {/each}
        {/each}
    {/each}
</svg>

<style>
</style>