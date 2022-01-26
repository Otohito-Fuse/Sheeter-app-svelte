<script lang="ts">
    import { xFirstDot, yLineInterval } from "../config/lengths";
    import DotsComponent from "./DotsComponent.svelte";

    export let xRel: number;
    export let xLeftEnd: number;
    export let xRightEnd: number;
    export let yMiddle: number;
    export let dots: number;

    $: cx = xLeftEnd + xRel * (xRightEnd - xLeftEnd);
</script>

<rect
    x={cx - yLineInterval}
    y={yMiddle - yLineInterval}
    width={yLineInterval * 2}
    height={yLineInterval / 2}
/>
<DotsComponent xFirstDotAbs={cx + xFirstDot * 1.1} {dots} yRel={0} {yMiddle} />
