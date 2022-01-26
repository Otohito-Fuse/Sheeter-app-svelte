<script lang="ts">
    import { rdot, xDotInterval, yLineInterval } from "../config/lengths";

    export let xFirstDotAbs: number;
    export let dots: number;
    export let yRel: number;
    export let yMiddle: number;
</script>

{#each Array(dots) as _, i}
    {#if yRel % 2 == 0}
        <circle
            style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
            cx={xFirstDotAbs + i * xDotInterval}
            cy={yMiddle - ((yRel + 1) / 2) * yLineInterval}
            r={rdot}
        />
    {:else}
        <circle
            style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
            cx={xFirstDotAbs + i * xDotInterval}
            cy={yMiddle - (yRel / 2) * yLineInterval}
            r={rdot}
        />
    {/if}
{/each}
