<script lang="ts">
	import { inputStore } from '$lib/utils/state.svelte';
	import ResourceCard from './ResourceCard.svelte';
</script>

{#if inputStore.ui}
	<div class="flex w-full flex-col gap-2 p-4">
		{#each inputStore.ui as input, index}
			<ResourceCard {input} {index} />
		{/each}
	</div>
{/if}
