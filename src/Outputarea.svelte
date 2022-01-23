<script lang="ts">
    import type { Stave } from './module/classes';
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
    {#each Array(staves.length) as _, i}
        {#if i != staves.length - 1}
            <StaveComponent yMiddle={yFirstStave + yStaveInterval * i} numOfBars={staves[i].bars.length} isLastStave={false} />
        {:else}
            <StaveComponent yMiddle={yFirstStave + yStaveInterval * i} numOfBars={staves[i].bars.length} isLastStave={true} />
        {/if}
    {/each}

    <NoteHeadWComponent xRel={0.2} xLeftEnd={xLeftMargin + clefWidth} xRightEnd={viewBoxWidth - xRightMargin} yRel={1} yMiddle={yFirstStave} dots={1} />
    <NoteHeadQComponent xRel={0.4} xLeftEnd={xLeftMargin + clefWidth} xRightEnd={viewBoxWidth - xRightMargin} yRel={2} yMiddle={yFirstStave} dots={1} />
    <NoteHeadHComponent xRel={0.3} xLeftEnd={xLeftMargin + clefWidth} xRightEnd={viewBoxWidth - xRightMargin} yRel={3} yMiddle={yFirstStave} dots={1} />
</svg>

<style>
</style>