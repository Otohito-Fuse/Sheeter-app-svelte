<script lang="ts">
    import { viewBoxWidth, yTitle } from "../config/lengths";

    export let title: string;
</script>

<text x={viewBoxWidth / 2} y={yTitle} font-size="80" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', YuGothic, 'Yu Gothic', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif">
    {title}
</text>