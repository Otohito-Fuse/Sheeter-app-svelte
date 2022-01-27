<script lang="ts">
    import { stemWidth } from "../config/lengths";

    import type { FlagType } from "../module/classes";
    import NoteFlagEComponent from "./NoteFlagEComponent.svelte";
    import NoteFlagSComponent from "./NoteFlagSComponent.svelte";

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
    <NoteFlagEComponent
        x={x + stemWidth / 2}
        y={yFlag}
        isUpward={yFlag < yHead}
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
    <NoteFlagSComponent
        x={x + stemWidth / 2}
        y={yFlag}
        isUpward={yFlag < yHead}
    />
{/if}
