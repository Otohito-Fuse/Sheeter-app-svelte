<script lang="ts">
    import { chordNoteSymbolSize } from "../config/lengths";
    import type { Accidental, NoteSymbol } from "../module/classes";
    import DoubleFlatComponent from "./DoubleFlatComponent.svelte";
    import FlatComponent from "./FlatComponent.svelte";
    import SharpComponent from "./SharpComponent.svelte";

    export let scale: number;
    export let noteSymbol: NoteSymbol;
    export let accidental: Accidental;
    export let cx: number;
    export let cy: number;

    $: x = (() => {
        if (accidental == "none") {
            return cx;
        } else if (accidental == "double flat") {
            return cx - scale * chordNoteSymbolSize * 0.3;
        } else {
            return cx - scale * chordNoteSymbolSize * 0.15;
        }
    })();
    $: y = cy + scale * chordNoteSymbolSize * 0.5;
</script>

{#if accidental == "none"}
    <text
        {x}
        {y}
        font-size={scale * chordNoteSymbolSize}
        text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif"
    >
        {noteSymbol}
    </text>
{:else if accidental == "flat"}
    <text
        {x}
        {y}
        font-size={scale * chordNoteSymbolSize}
        text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif"
    >
        {noteSymbol}
    </text>
    <FlatComponent
        cx={cx + scale * chordNoteSymbolSize * 0.3}
        cy={cy - scale * chordNoteSymbolSize * 0.15}
        scaleRatio={0.75}
    />
{:else if accidental == "double flat"}
    <text
        {x}
        {y}
        font-size={scale * chordNoteSymbolSize}
        text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif"
    >
        {noteSymbol}
    </text>
    <DoubleFlatComponent
        cx={cx + scale * chordNoteSymbolSize * 0.3}
        cy={cy - scale * chordNoteSymbolSize * 0.15}
        scaleRatio={0.75}
    />
{:else if accidental == "sharp"}
    <text
        {x}
        {y}
        font-size={scale * chordNoteSymbolSize}
        text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif"
    >
        {noteSymbol}
    </text>
    <SharpComponent
        cx={cx + scale * chordNoteSymbolSize * 0.3}
        cy={cy - scale * chordNoteSymbolSize * 0.15}
        scaleRatio={0.75}
    />
{:else if accidental == "double sharp"}
    <text
        {x}
        {y}
        font-size={scale * chordNoteSymbolSize}
        text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif"
    >
        {noteSymbol}
    </text>
{/if}
