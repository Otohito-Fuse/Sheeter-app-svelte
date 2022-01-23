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
    d="m 11.9799,-28.044092
        a 25.42448,37.894733 65 0 0 -22.724708,5.001244
            25.42448,37.894733 65 0 0 -23.599593,39.057558
            25.42448,37.894733 65 0 0 45.089241,7.02748
            25.42448,37.894733 65 0 0 23.59959,-39.05756
            25.42448,37.894733 65 0 0 -22.36453,-12.028722
        z
        m -11.9801455354,5.461682
        a 16.280342,22.582411 0 0 1 16.2806555354,22.58208337714
            16.280342,22.582411 0 0 1 -16.2806555354,22.58259662286
            16.280342,22.582411 0 0 1 -16.2801434646,-22.58259662286
            16.280342,22.582411 0 0 1 16.2801434646,-22.58208337714
        z"
    transform="scale({scale}) translate({cx / scale} {cy / scale})" />
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