<script lang="ts">
    export let inputText: string;
</script>

<textarea bind:value={inputText} />
<p>{inputText}</p>

<style>
    textarea {
        width: 50%;
        height: 100px;
        margin: 30px;
    }
</style>