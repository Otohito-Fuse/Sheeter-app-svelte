<script lang="ts">
    import { yLineInterval } from "../config/lengths";

    export let timeSignatureNumer: number;
    export let timeSignatureDenom: number;
    export let cx: number;
    export let yMiddle: number;

    $: fontSize = yLineInterval * 2.7;
</script>

{#if timeSignatureNumer != 0 && timeSignatureDenom != 0}
    <text
        x={cx}
        y={yMiddle - yLineInterval + fontSize * 0.35}
        font-size={fontSize}
        text-anchor="middle"
        font-family="'Times New Roman', Times, Georgia, serif"
    >
        {String(timeSignatureNumer)}
    </text>
    <text
        x={cx}
        y={yMiddle + yLineInterval + fontSize * 0.35}
        font-size={fontSize}
        text-anchor="middle"
        font-family="'Times New Roman', Times, Georgia, serif"
    >
        {String(timeSignatureDenom)}
    </text>
{/if}
