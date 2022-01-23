<script lang="ts">
    import type { Stave } from './module/classes';
    import { viewBoxHeight, viewBoxWidth, yTitle, yFirstStave, yStaveInterval } from './config/lengths';
    import StaveComponent from './svgComponents/StaveComponent.svelte';

    export let width: number;
    $: height = width * viewBoxHeight / viewBoxWidth;

    export let staves: Array<Stave>;
    export let title: string;
</script>

<svg {height} {width} viewBox="0 0 {viewBoxWidth} {viewBoxHeight}" preserveAspectRatio="xMidYMin">
    <text x={viewBoxWidth / 2} y={yTitle} font-size="80" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif">
        {title}
    </text>

    {#each Array(staves.length) as _, i}
        <StaveComponent yMiddle={yFirstStave + yStaveInterval * i} />
    {/each}
</svg>

<style>
</style>