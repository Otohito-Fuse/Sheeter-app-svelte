<script lang="ts">
    export let xRel: number;
    export let xLeftEnd: number;
    export let xRightEnd: number;
    export let yRel: number;
    export let yMiddle: number;
    export let dots: number;

    import { yLineInterval, rdot, xDotInterval, xFirstDot } from "../config/lengths";

    const rx: number = yLineInterval * 0.37894733 * 1.9;
    const ry: number = yLineInterval * 0.2542448 * 1.9;

    $: cx = xLeftEnd + xRel * (xRightEnd - xLeftEnd);
    $: cy = yMiddle - yRel / 2 * yLineInterval;
</script>


<ellipse
    style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
    {cx}
    {cy}
    {rx}
    {ry}
    transform="rotate(-25, {cx}, {cy})" />
{#each Array(dots) as _, i}
    {#if yRel % 2 == 0}
        <circle
            style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
            cx={cx + xFirstDot + i * xDotInterval}
            cy={cy - yLineInterval / 2}
            r={rdot} />
    {:else}
        <circle
            style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
            cx={cx + xFirstDot + i * xDotInterval}
            {cy}
            r={rdot} />
    {/if}
{/each}