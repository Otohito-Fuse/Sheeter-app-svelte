<script lang="ts">
    import { stemWidth } from "../config/lengths";

    import type { FlagType } from "../module/classes";

    export let x: number;
    export let yHead: number;
    export let yFlag: number;
    export let flagType: FlagType;
</script>

{#if flagType == "none"}
    <line
        x1={x}
        y1={yHead}
        x2={x}
        y2={yFlag}
        stroke="black"
        stroke-width={stemWidth}
    />
{:else if flagType == "eighth"}
    <line
        x1={x}
        y1={yHead}
        x2={x}
        y2={yFlag}
        stroke="black"
        stroke-width={stemWidth}
    />
{:else}
    <line
        x1={x}
        y1={yHead}
        x2={x}
        y2={yFlag}
        stroke="black"
        stroke-width={stemWidth}
    />
{/if}
