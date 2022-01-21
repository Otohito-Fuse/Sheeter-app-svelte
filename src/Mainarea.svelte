<script lang="ts">
    import Inputarea from "./Inputarea.svelte";

    let leftWidth: number = 50;
    let dragging: boolean = false;

    const updateWidth = (e: any) => {
        if (dragging) {
            let newLeftWidthPixel = e.clientX;
            let newLeftWidth = (newLeftWidthPixel / window.innerWidth) * 100;
            if (newLeftWidth >= 20 && newLeftWidthPixel >= 300) {
                leftWidth = newLeftWidth;
            }
        }
    }

    const updateWidthWithTap = (e: any) => {
        if (dragging) {
            let newLeftWidth = (e.changedTouches[0].pageX / window.innerWidth) * 100;
            if (newLeftWidth >= 10 && newLeftWidth <= 90) {
                leftWidth = newLeftWidth;
            }
        }
    }

    let windowWidth: number = window.innerWidth;

    const updateWindowWidth = () => {
        windowWidth = window.innerWidth;
        if (windowWidth * leftWidth * 0.01 < 300) {
            leftWidth = (300 / windowWidth) * 100;
        }
    };

    window.addEventListener('resize', updateWindowWidth);

    let title = "Title";
</script>

{#if windowWidth > 640}
    <div class="whole"
        on:mousemove={updateWidth}
        on:mouseup={() => {dragging = false;}}
        on:touchmove={updateWidthWithTap}
        on:touchend={() => {dragging = false;}}>
        <div class="l-r left" style="width: {leftWidth}%;">
            <Inputarea {title} />
        </div>
        <div class="border border-v" class:dragging
            on:mousedown|preventDefault={() => {dragging = true;}}
            on:touchstart|preventDefault={() => {dragging = true;}}>
        </div>
        <div class="l-r right" style="width: {100 - leftWidth}%;">
        </div>
    </div>
{:else}
    <div class="whole-small">
        <div class="u-d up">
            <Inputarea {title} />
        </div>
        <div class="border border-h">
        </div>
        <div class="u-d down">
        </div>
    </div>
{/if}

<style>
    .whole {
        background-color: #fff;
        display : -webkit-box;     /* old Android */
        display : -webkit-flex;    /* Safari etc. */
        display : -ms-flexbox;     /* IE10        */
        display : flex;
        -webkit-align-items: center;      /* Safari etc. */
        -ms-align-items    : center;      /* IE10        */
        align-items        : center;
        height: calc(100vh - 100px);
    }

    .l-r {
        overflow: auto;
        height: 100%;
    }

    .left {
        background-color: #f9feff;
    }

    .right {
        background-color: #fff;
    }

    .border {
        border: 2px solid #ccc;
    }
    
    .border-v {
        width: 0px;
        height: 100%;
        cursor: ew-resize;
    }

    .border-v:hover, .dragging {
        border-width: 3px;
    }

    .u-d {
        width: 100%;
        height: calc(90vh - 80px);
        overflow: auto;
    }

    .up {
        background-color: #f9feff;
    }

    .border-h {
        height: 0;
        width: 100%;
    }

    .down {
        background-color: #fff;
    }
</style>