<script lang="ts">
import Textarea from "./Textarea.svelte";

    export let title: string;
</script>

<div class="whole">
    <div class="each-block title-area">
        <div class="name">
            <p>
                Title:
            </p>
        </div>
        <div class="contents">
            <Textarea rows={1} value={title} />
        </div>
    </div>
    <div class="each-block chords-area">
        <div class="name">
            <p>
                Chords:
            </p>
        </div>
        <div class="contents">
            
        </div>
    </div>
    <div class="each-block notes-area">
        <div class="name">
            <p>
                Notes:
            </p>
        </div>
        <div class="contents">
            
        </div>
    </div>
</div>


<style>
    .whole {
        height: 100%;
        width: 100%;
    }

    .each-block {
        width: 100%;
        display : -webkit-box;     /* old Android */
        display : -webkit-flex;    /* Safari etc. */
        display : -ms-flexbox;     /* IE10        */
        display : flex;
    }
    
    .title-area {
        height: 80px;
        border-bottom: 1px solid #ddd;
    }

    .chords-area {
        height: calc((100% - 80px) / 3);
        border-bottom: 1px solid #ddd;
    }

    .notes-area {
        height: calc(100% - 80px - ((100% - 80px) / 3));
    }

    .name {
        width: min(25%, 120px);
        height: 100%;
    }

    .name > p {
        font-size: 1.3em;
        font-weight: 200;
        margin: 27px 5px auto auto;
        text-align: right;

        user-select: none; /* CSS3 */
        -moz-user-select: none; /* Firefox */
        -webkit-user-select: none; /* Safari、Chromeなど */
        -ms-user-select: none; /* IE10から */
    }

    .contents {
        width: calc(100% - min(25%, 120px));
        height: 100%;
    }
</style>