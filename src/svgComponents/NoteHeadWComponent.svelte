<script lang="ts">
    export let xRel: number;
    export let xLeftEnd: number;
    export let xRightEnd: number;
    export let yRel: number;
    export let yMiddle: number;
    export let dots: number;

    import { yLineInterval, rdot, xDotInterval, xFirstDot } from "../config/lengths";

    $: cx = xLeftEnd + xRel * (xRightEnd - xLeftEnd);
    $: cy = yMiddle - yRel / 2 * yLineInterval;

    $: scale = yLineInterval / 50;
</script>

<path
style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
    d="m 13.892908,-28.044092
        a 25.930325,43.088662 71.838869 0 0 -26.353503,5.001244
            25.930325,43.088662 71.838869 0 0 -27.368094,39.057558
            25.930325,43.088662 71.838869 0 0 52.289316,7.02748
            25.930325,43.088662 71.838869 0 0 27.368091,-39.05756
            25.930325,43.088662 71.838869 0 0 -25.93581,-12.028722
        z
        m -13.8931951631,5.461682
        a 18.880068,22.582411 0 0 1 18.8804321631,22.58208337714
            18.880068,22.582411 0 0 1 -18.8804321631,22.58259662286
            18.880068,22.582411 0 0 1 -18.8798378369,-22.58259662286
            18.880068,22.582411 0 0 1 18.8798378369,-22.58208337714
        z"
    transform="scale({scale}) translate({cx / scale} {cy / scale})" />
{#each Array(dots) as _, i}
    {#if yRel % 2 == 0}
        <circle
            style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
            cx={cx + xFirstDot * 1.1 + i * xDotInterval}
            cy={cy - yLineInterval / 2}
            r={rdot} />
    {:else}
        <circle
            style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
            cx={cx + xFirstDot * 1.1 + i * xDotInterval}
            {cy}
            r={rdot} />
    {/if}
{/each}