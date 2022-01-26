<script lang="ts">
    export let xFrom: number;
    export let xTo: number;
    export let y: number;
    export let isUpward: boolean;

    $: xScale = (xTo - xFrom) / 100;
    $: yScale = 0.6 + (xTo - xFrom) / 500;

    $: transform = "scale(" + String(xScale) + ", " + String(yScale) + ")" + (isUpward ? " rotate(-180 50 0) translate(-" + String(xFrom / xScale) + " -" + String(y / yScale) + ")" : " translate(" + String(xFrom / xScale) + " " + String(y / yScale) + ")");
</script>


<path
    style="fill:#000000;stroke:#000000;stroke-width:0;"
    d="m 0.34374595,0.28468794 c 9.13157625,8.49839666 28.60356705,13.92175606 49.99999905,13.92605306 21.396435,-0.0043 40.868428,-5.4276556 50.000005,-13.92605306 -11.944667,7.57410136 -30.417169,11.41340306 -50.000005,11.41394706 -19.582834,-5.45e-4 -38.055333,-3.8398465 -49.99999905,-11.41394706 z"
    {transform}  />
