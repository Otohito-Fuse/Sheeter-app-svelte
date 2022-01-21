<script lang="ts">
    import Input from "./Input.svelte";
    import Textarea from "./Textarea.svelte";

    import { createEventDispatcher } from 'svelte';

    export let title: string;
    export let chords: string;
    export let notes: string;

    const dispatch = createEventDispatcher();

    const setSampleValues = () => {
        dispatch('setSampleValues');
    }

    const resetValues = () => {
        dispatch('resetValues');
    }
</script>

<div class="whole">
    <div class="each-block title-area">
        <div class="name">
            <p>
                Title:
            </p>
        </div>
        <div class="contents-wrapper">
            <div class="contents-title">
                <div class="title-input">
                    <Input bind:value={title} placeholder="Input the title here." />
                </div>
                <div class="title-menus">
                    <p>
                        <span class="link" on:click={setSampleValues}>sample</span>
                        <span style="display: inline-block; width: 3px;"></span>
                        <span class="link" on:click={resetValues}>reset</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="each-block chords-area">
        <div class="name">
            <p>
                Chords:
            </p>
        </div>
        <div class="contents-wrapper">
            <div class="contents-textarea">
                <Textarea bind:value={chords} placeholder="Input chords here." />
            </div>
        </div>
    </div>
    <div class="each-block notes-area">
        <div class="name">
            <p>
                Notes:
            </p>
        </div>
        <div class="contents-wrapper">
            <div class="contents-textarea">
                <Textarea bind:value={notes} placeholder="Input notes here." />
            </div>
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
        height: calc(((100% - 80px) / 3) - 1px);
        border-bottom: 1px solid #ddd;
    }

    .notes-area {
        height: calc(100% - 81px - ((100% - 80px) / 3));
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

    .contents-wrapper {
        width: calc(100% - min(25%, 120px));
        height: 100%;
    }

    .contents-title {
        width: calc(100% - 15px);
        height: calc(100% - 30px);
        margin: 15px 10px 15px 5px;
        display : -webkit-box;     /* old Android */
        display : -webkit-flex;    /* Safari etc. */
        display : -ms-flexbox;     /* IE10        */
        display : flex;
    }

    .title-input {
        width: calc(100% - 110px);
    }

    .title-menus {
        text-align: right;
        width: 110px;
        padding-right: 8px;
    }

    .link {
        color: rgb(0,100,200);
        text-decoration: underline;
        cursor: pointer;
        transition: .1s;

        user-select: none; /* CSS3 */
        -moz-user-select: none; /* Firefox */
        -webkit-user-select: none; /* Safari、Chromeなど */
        -ms-user-select: none; /* IE10から */
    }

    .link:hover {
        text-decoration-color: rgba(0, 100, 200, 0);
    }

    .contents-textarea {
        width: calc(100% - 15px);
        height: calc(100% - 30px);
        margin: 23px 10px 7px 5px;
    }
</style>