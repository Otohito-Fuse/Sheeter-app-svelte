<script lang="ts">
    import type { Stave } from "./module/classes";
    import {
        viewBoxHeight,
        viewBoxWidth,
        yFirstStave,
        yStaveInterval,
    } from "./config/lengths";
    import StaveComponent from "./svgComponents/StaveComponent.svelte";
    import RestComponent from "./svgComponents/RestComponent.svelte";
    import NoteHeadComponent from "./svgComponents/NoteHeadComponent.svelte";
    import TitleComponent from "./svgComponents/TitleComponent.svelte";
    import ChordComponent from "./svgComponents/ChordComponent.svelte";
    import TiesComponent from "./svgComponents/TiesComponent.svelte";
    import StemsComponent from "./svgComponents/StemsComponent.svelte";

    export let width: number;
    $: height = (width * viewBoxHeight) / viewBoxWidth;

    export let staves: Array<Stave>;
    export let title: string;
</script>

<svg
    {height}
    {width}
    viewBox="0 0 {viewBoxWidth} {viewBoxHeight}"
    preserveAspectRatio="xMidYMin"
>
    <TitleComponent {title} />

    {#each staves as stave, i}
        {#if i != staves.length - 1}
            <StaveComponent
                yMiddle={yFirstStave + yStaveInterval * i}
                numOfBars={stave.bars.length}
                isLastStave={false}
                timeSignatureNumer={stave.timeSignatureNumer}
                timeSignatureDenom={stave.timeSignatureDenom}
                keySignature={stave.keySignature}
            />
        {:else}
            <StaveComponent
                yMiddle={yFirstStave + yStaveInterval * i}
                numOfBars={stave.bars.length}
                isLastStave={true}
                timeSignatureNumer={stave.timeSignatureNumer}
                timeSignatureDenom={stave.timeSignatureDenom}
                keySignature={stave.keySignature}
            />
        {/if}
        {#each stave.bars as bar, j}
            {#each bar.noteHeads as { xRel, yRel, noteHeadType, dots, accidental }}
                <NoteHeadComponent
                    {noteHeadType}
                    {xRel}
                    {yRel}
                    {dots}
                    {accidental}
                    {i}
                    {j}
                    numOfBars={stave.bars.length}
                    numOfKeySignatures={Math.abs(stave.keySignature)}
                    timeSignatureNumer={stave.timeSignatureNumer}
                    timeSignatureDenom={stave.timeSignatureDenom}
                />
            {/each}
            {#each bar.rests as { xRel, restType, dots }}
                <RestComponent
                    {restType}
                    {xRel}
                    {dots}
                    {i}
                    {j}
                    rests={bar.rests}
                    numOfBars={stave.bars.length}
                    numOfKeySignatures={Math.abs(stave.keySignature)}
                    timeSignatureNumer={stave.timeSignatureNumer}
                    timeSignatureDenom={stave.timeSignatureDenom}
                />
            {/each}
            <TiesComponent
                {i}
                {j}
                ties={bar.ties}
                numOfBars={stave.bars.length}
                numOfKeySignatures={Math.abs(stave.keySignature)}
                timeSignatureNumer={stave.timeSignatureNumer}
                timeSignatureDenom={stave.timeSignatureDenom}
            />
            <StemsComponent
                {i}
                {j}
                stems={bar.stems}
                numOfBars={stave.bars.length}
                numOfKeySignatures={Math.abs(stave.keySignature)}
                timeSignatureNumer={stave.timeSignatureNumer}
                timeSignatureDenom={stave.timeSignatureDenom}
            />
        {/each}
        {#each stave.chords as chords, j}
            {#each chords as { chordPlaceHolder, xRel }}
                <ChordComponent
                    {xRel}
                    {i}
                    {j}
                    {chordPlaceHolder}
                    staveBarsLength={stave.bars.length}
                    numOfKeySignatures={Math.abs(stave.keySignature)}
                    timeSignatureNumer={stave.timeSignatureNumer}
                    timeSignatureDenom={stave.timeSignatureDenom}
                />
            {/each}
        {/each}
    {/each}
</svg>

<style>
</style>
