<script lang="ts">
    export let value: string;
    export let placeholder: string;
</script>

<input bind:value {placeholder} spellcheck="false" autocomplete="off" />

<style>
    input {
        width: 100%;
        height: 100%;
        border: none;
        background-color: rgba(255, 255, 255, 0);
        box-shadow: none;
        resize: none;
    }
</style>