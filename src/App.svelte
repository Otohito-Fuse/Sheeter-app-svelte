<script lang="ts">
	export let name: string = "";

	import Button from './Button.svelte';
	import Header from './Header.svelte';
	import Textarea from './Textarea.svelte';
</script>

<Header />
<Button /><br>
<Textarea bind:inputText={name}/>