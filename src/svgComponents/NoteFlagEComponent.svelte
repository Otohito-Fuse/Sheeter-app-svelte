<script lang="ts">
    import { yLineInterval } from "../config/lengths";

    export let x: number;
    export let y: number;
    export let isUpward: boolean;

    $: scale = yLineInterval / 32;

    $: transform = isUpward
        ? "scale(" +
          String(scale) +
          ")" +
          " translate(" +
          String(x / scale) +
          " " +
          String(y / scale) +
          ")"
        : "scale(" +
          String(scale) +
          " " +
          String(-scale) +
          ")" +
          " translate(" +
          String(x / scale) +
          " " +
          String(-y / scale) +
          ")";
</script>

<path
    style="fill: #000000; fill-rule: evenodd; stroke-width: 0"
    d="m 0.1322915,0.20079656 v 29.17519544 c 0,0 0.94525,1.04738 2.86031,2.860314 2.96256,2.804577 11.7267205,11.463111 16.3037905,16.875851 4.32124,5.11019 8.60276,12.11629 9.13525,19.19871 0.53655,7.13637 -1.14271,16.58785 -4.70907,26.52439 -1.9313,5.380953 -3.62376,8.222963 -3.06452,8.587383 0.79714,0.51945 2.7385,-2.97941 6.4668,-10.625733 6.32003,-12.96167 7.43952,-25.40692 6.55264,-34.62269 -1.15046,-11.95469 -2.28519,-23.402003 -9.94627,-35.007151 -6.79549,-10.293932 -14.7193405,-17.7092604 -19.5333005,-20.7143534 -2.59687,-1.62108305 -4.06563,-2.25191604 -4.06563,-2.25191604 z"
    {transform}
/>
