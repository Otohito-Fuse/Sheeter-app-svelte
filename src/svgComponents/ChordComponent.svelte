<script lang="ts">
    import {
        chordNoteSymbolSize,
        clefWidth,
        keySignatureWidthUnit,
        timeSignatureWidth,
        viewBoxWidth,
        xLeftMargin,
        xRightMargin,
        yChordHeight,
        yFirstStave,
        yStaveInterval,
    } from "../config/lengths";

    import type { ChordPlaceHolder } from "../module/chordParser";
    import ChordSuffixComponent from "./ChordSuffixComponent.svelte";
    import NoteSymbolComponent from "./NoteSymbolComponent.svelte";

    export let xRel: number;
    export let i: number;
    export let j: number;
    export let chordPlaceHolder: ChordPlaceHolder;
    export let staveBarsLength: number;
    export let numOfKeySignatures: number;
    export let timeSignatureNumer: number;
    export let timeSignatureDenom: number;

    $: calcX = (
        j: number,
        bars: number,
        numOfKeySignatures: number,
        timeSignatureNumer: number,
        timeSignatureDenom: number
    ) => {
        if (timeSignatureNumer == 0 && timeSignatureDenom == 0) {
            let xLeft: number =
                xLeftMargin +
                clefWidth +
                numOfKeySignatures * keySignatureWidthUnit +
                ((viewBoxWidth -
                    xLeftMargin -
                    clefWidth -
                    xRightMargin -
                    numOfKeySignatures * keySignatureWidthUnit) *
                    j) /
                    bars;
            let barWidth: number =
                (viewBoxWidth -
                    xLeftMargin -
                    clefWidth -
                    xRightMargin -
                    numOfKeySignatures * keySignatureWidthUnit) /
                bars;
            return xLeft + barWidth * xRel;
        } else {
            let xLeft: number =
                xLeftMargin +
                clefWidth +
                numOfKeySignatures * keySignatureWidthUnit +
                timeSignatureWidth +
                ((viewBoxWidth -
                    xLeftMargin -
                    clefWidth -
                    xRightMargin -
                    numOfKeySignatures * keySignatureWidthUnit -
                    timeSignatureWidth) *
                    j) /
                    bars;
            let barWidth: number =
                (viewBoxWidth -
                    xLeftMargin -
                    clefWidth -
                    xRightMargin -
                    numOfKeySignatures * keySignatureWidthUnit -
                    timeSignatureWidth) /
                bars;
            return xLeft + barWidth * xRel;
        }
    };

    $: x = calcX(
        j,
        staveBarsLength,
        numOfKeySignatures,
        timeSignatureNumer,
        timeSignatureDenom
    );
    $: y = yFirstStave + yStaveInterval * i - yChordHeight;
</script>

{#if chordPlaceHolder == "%"}
    <text />
{:else if chordPlaceHolder == "/"}
    <text
        {x}
        y={y + chordNoteSymbolSize * 0.4}
        font-size={chordNoteSymbolSize}
        text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif"
    >
        /
    </text>
{:else if chordPlaceHolder == "N.C."}
    <text
        {x}
        y={y + chordNoteSymbolSize * 0.4}
        font-size={chordNoteSymbolSize * 0.8}
        text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif"
    >
        N.C.
    </text>
{:else if !!chordPlaceHolder.noteSymbol}
    {#if !chordPlaceHolder.suffix1 && !chordPlaceHolder.suffix2}
        <NoteSymbolComponent
            scale={1}
            noteSymbol={chordPlaceHolder.noteSymbol}
            accidental={chordPlaceHolder.accidental}
            cx={x}
            cy={y}
        />
    {:else}
        <NoteSymbolComponent
            scale={1}
            noteSymbol={chordPlaceHolder.noteSymbol}
            accidental={chordPlaceHolder.accidental}
            cx={x - chordNoteSymbolSize * 0.25}
            cy={y}
        />
        <ChordSuffixComponent
            suffix1={chordPlaceHolder.suffix1}
            suffix2={chordPlaceHolder.suffix2}
            cx={x}
            cy={y}
        />
    {/if}
{:else}
    <text />
{/if}
