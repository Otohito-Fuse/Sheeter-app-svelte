<script lang="ts">
    export let yMiddle: number;
    export let isLastStave: boolean;
    export let numOfBars: number;

    import { viewBoxWidth, xLeftMargin, xRightMargin, yLineInterval, lineWidth, clefWidth, barWidth, doubleBarInterval } from "../config/lengths";
</script>

{#each Array(5) as _, i}
    <line
        x1={xLeftMargin}
        y1={yMiddle + (i - 2) * yLineInterval}
        x2={viewBoxWidth - xRightMargin}
        y2={yMiddle + (i - 2) * yLineInterval}
        stroke="black"
        stroke-width={lineWidth} />
{/each}
{#each Array(numOfBars) as _, i}
    {#if !isLastStave || i != numOfBars - 1}
        <line
            x1={xLeftMargin + clefWidth + ((viewBoxWidth - xLeftMargin - xRightMargin - clefWidth) / numOfBars) * (i + 1)}
            y1={yMiddle - 2 * yLineInterval - (lineWidth / 2)}
            x2={xLeftMargin + clefWidth + ((viewBoxWidth - xLeftMargin - xRightMargin - clefWidth) / numOfBars) * (i + 1)}
            y2={yMiddle + 2 * yLineInterval + (lineWidth / 2)}
            stroke="black"
            stroke-width={barWidth} />
    {/if}
{/each}
{#if isLastStave}
    <line
        x1={viewBoxWidth - xRightMargin}
        y1={yMiddle - 2 * yLineInterval - (lineWidth / 2)}
        x2={viewBoxWidth - xRightMargin}
        y2={yMiddle + 2 * yLineInterval + (lineWidth / 2)}
        stroke="black"
        stroke-width={barWidth * 2} />
    <line
        x1={viewBoxWidth - xRightMargin - doubleBarInterval}
        y1={yMiddle - 2 * yLineInterval - (lineWidth / 2)}
        x2={viewBoxWidth - xRightMargin - doubleBarInterval}
        y2={yMiddle + 2 * yLineInterval + (lineWidth / 2)}
        stroke="black"
        stroke-width={barWidth} />
{/if}