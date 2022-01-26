<script lang="ts">
    import {
        ledgerLineLength,
        lineWidth,
        yLineInterval,
    } from "../config/lengths";

    export let cx: number;
    export let yMiddle: number;
    export let yRel: number;
</script>

{#if yRel >= 6}
    {#each Array(Math.floor((yRel - 4) / 2)) as _, i}
        <line
            x1={cx - ledgerLineLength / 2}
            y1={yMiddle - (i + 3) * yLineInterval}
            x2={cx + ledgerLineLength / 2}
            y2={yMiddle - (i + 3) * yLineInterval}
            stroke="black"
            stroke-width={lineWidth}
        />
    {/each}
{/if}
{#if yRel <= -6}
    {#each Array(Math.floor((-yRel - 4) / 2)) as _, i}
        <line
            x1={cx - ledgerLineLength / 2}
            y1={yMiddle + (i + 3) * yLineInterval}
            x2={cx + ledgerLineLength / 2}
            y2={yMiddle + (i + 3) * yLineInterval}
            stroke="black"
            stroke-width={lineWidth}
        />
    {/each}
{/if}
