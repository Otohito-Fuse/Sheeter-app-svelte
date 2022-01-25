<script lang="ts">
import { chordNoteSymbolSize } from "../config/lengths";


    export let suffix1: string;
    export let suffix2: string;
    export let cx: number;
    export let cy: number;

    $: x1 = cx + chordNoteSymbolSize * 0.15;
    $: x2 = cx + chordNoteSymbolSize * 0.2;
    $: y1 = cy + chordNoteSymbolSize * 0.55;
    $: y2 = cy - chordNoteSymbolSize * 0.15;
</script>

<text x={x1} y={y1} font-size={chordNoteSymbolSize * 0.6} font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif">
    {suffix1}
</text>

<text x={x2} y={y2} font-size={chordNoteSymbolSize * 0.6} font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif">
    {suffix2}
</text>