<script lang="ts">
    export let width: number;
    $: height = width * 297 / 210;
</script>

<svg {height} {width} preserveAspectRatio="xMidYMin">

</svg>

<style>
</style>