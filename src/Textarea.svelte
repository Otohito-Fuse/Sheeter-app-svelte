<script lang="ts">
    export let value: string;
    export let placeholder: string;
</script>

<textarea bind:value {placeholder} spellcheck="false" autocomplete="off" />

<style>
    textarea {
        border: none;
        background-color: rgba(255, 255, 255, 0);
        box-shadow: none;
        resize: none;
        width: 100%;
        height: 100%;
    }
</style>