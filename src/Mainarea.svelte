<script lang="ts">
    import Inputarea from "./Inputarea.svelte";
    import Outputarea from "./Outputarea.svelte";

    import {
        sampleTitle,
        sampleChords,
        sampleNotes,
        widthThreshold,
    } from "./config/constants";
    import { loadFromStorage, saveToStorage } from "./lib/storage";

    import { parse } from "./module/parser";

    let leftWidth: number = 50;
    $: rightWidth = 100 - leftWidth;
    let dragging: boolean = false;

    const minLeftWidthPixel: number = widthThreshold / 2 - 10;

    const updateWidth = (e: any) => {
        if (dragging) {
            let newLeftWidthPixel = e.clientX;
            let newLeftWidth = (newLeftWidthPixel / window.innerWidth) * 100;
            if (newLeftWidth >= 20 && newLeftWidthPixel >= minLeftWidthPixel) {
                leftWidth = newLeftWidth;
            }
        }
    };

    const updateWidthWithTap = (e: any) => {
        if (dragging) {
            let newLeftWidthPixel = e.changedTouches[0].pageX;
            let newLeftWidth = (newLeftWidthPixel / window.innerWidth) * 100;
            if (newLeftWidth >= 20 && newLeftWidthPixel >= minLeftWidthPixel) {
                leftWidth = newLeftWidth;
            }
        }
    };

    let windowWidth: number = window.innerWidth;

    const updateWindowWidth = () => {
        windowWidth = window.innerWidth;
        if (windowWidth * leftWidth * 0.01 < minLeftWidthPixel) {
            leftWidth = (minLeftWidthPixel / windowWidth) * 100;
        }
    };

    window.addEventListener("resize", updateWindowWidth);

    let title: string = loadFromStorage("title");
    let chords: string = loadFromStorage("chords");
    let notes: string = loadFromStorage("notes");

    const setSampleValues = () => {
        title = sampleTitle;
        chords = sampleChords;
        notes = sampleNotes;
    };

    const resetValues = () => {
        title = "";
        chords = "";
        notes = "";
    };

    $: {
        saveToStorage("title", title);
    }

    $: {
        saveToStorage("chords", chords);
    }

    $: {
        saveToStorage("notes", notes);
    }

    $: staves = parse(notes, chords);
</script>

{#if windowWidth > widthThreshold}
    <div
        class="whole"
        on:mousemove={updateWidth}
        on:mouseup={() => {
            dragging = false;
        }}
        on:touchmove={updateWidthWithTap}
        on:touchend={() => {
            dragging = false;
        }}
    >
        <div class="l-r left" style="width: calc({leftWidth}% - 1px);">
            <Inputarea
                bind:title
                bind:chords
                bind:notes
                on:setSampleValues={setSampleValues}
                on:resetValues={resetValues}
            />
        </div>
        <div
            class="border border-v"
            class:dragging
            on:mousedown|preventDefault={() => {
                dragging = true;
            }}
            on:touchstart|preventDefault={() => {
                dragging = true;
            }}
        />
        <div class="l-r right" style="width: calc({rightWidth}% - 1px);">
            <Outputarea
                width={rightWidth * windowWidth * 0.01 - 1}
                {staves}
                {title}
            />
        </div>
    </div>
{:else}
    <div class="whole-small">
        <div class="u-d up">
            <Inputarea
                bind:title
                bind:chords
                bind:notes
                on:setSampleValues={setSampleValues}
                on:resetValues={resetValues}
            />
        </div>
        <div class="border border-h" />
        <div class="u-d down">
            <Outputarea width={windowWidth} {staves} {title} />
        </div>
    </div>
{/if}

<style>
    .whole {
        background-color: #fff;
        display: -webkit-box; /* old Android */
        display: -webkit-flex; /* Safari etc. */
        display: -ms-flexbox; /* IE10        */
        display: flex;
        -webkit-align-items: center; /* Safari etc. */
        -ms-align-items: center; /* IE10        */
        align-items: center;
        height: calc(100vh - 100px);
    }

    .l-r {
        height: 100%;
    }

    .left {
        background-color: #f9feff;
    }

    .right {
        background-color: #fff;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .border {
        border: 2px solid #ccc;
    }

    .border-v {
        width: 0px;
        height: 100%;
        cursor: ew-resize;
        transition: 0.2s;
    }

    .border-v:hover,
    .dragging {
        border-color: #bbb;
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
