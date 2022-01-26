<script lang="ts">
    import { chordNoteSymbolSize } from "../config/lengths";
    import FlatComponent from "./FlatComponent.svelte";
    import SharpComponent from "./SharpComponent.svelte";

    export let suffix1: string;
    export let suffix2: string;
    export let cx: number;
    export let cy: number;

    $: x1 = cx + chordNoteSymbolSize * 0.15;
    $: x2 = cx + chordNoteSymbolSize * 0.25;
    $: y1 = cy + chordNoteSymbolSize * 0.55;
    $: y2 = cy - chordNoteSymbolSize * 0.15;

    $: suffix2Length = suffix2.length;

    const chordSuffixSize: number = chordNoteSymbolSize * 0.6;
</script>

<text x={x1} y={y1} font-size={chordSuffixSize} font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif">
    {suffix1}
</text>

{#each Array(suffix2Length) as _, i}
    {#if suffix2.charAt(i) == "#"}
        <SharpComponent cx={x2 + (2 * i + 1) * chordSuffixSize / 4} cy={y2 - chordSuffixSize / 3} scaleRatio={0.6} />
    {:else if suffix2.charAt(i) == "b"}
        <FlatComponent cx={x2 + (2 * i + 1) * chordSuffixSize / 4} cy={y2 - chordSuffixSize / 4} scaleRatio={0.6} />
    {:else}
        <text x={x2 + i * chordSuffixSize / 2} y={y2} font-size={chordSuffixSize} font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif">
            {suffix2.charAt(i)}
        </text>
    {/if}
{/each}