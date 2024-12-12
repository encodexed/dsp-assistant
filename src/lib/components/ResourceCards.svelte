<script lang="ts">
	import { inputStore } from '$lib/utils/state.svelte';
	import ResourceCard from './ResourceCard.svelte';
</script>

{#if inputStore.ui}
	<div class="flex h-60 w-full flex-col items-center gap-2 p-4">
		{#each inputStore.ui as tier}
			<div class="flex w-full justify-around">
				{#each tier as t}
					<ResourceCard
						identifier={t.identifier}
						amount={t.amount}
						buildings={t.requiredBuildings}
					/>
				{/each}
			</div>
		{/each}
	</div>
{/if}
