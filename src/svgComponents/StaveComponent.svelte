<script lang="ts">
    export let yMiddle: number;

    import { viewBoxWidth, xLeftMargin, xRightMargin, yLineInterval, lineWidth } from "../config/lengths";
</script>

{#each Array(5) as _, i}
    <line x1={xLeftMargin} y1={yMiddle + (i - 2) * yLineInterval} x2={viewBoxWidth - xRightMargin} y2={yMiddle + (i - 2) * yLineInterval} stroke="black" stroke-width={lineWidth} />
{/each}