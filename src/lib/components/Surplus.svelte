<script lang="ts">
	import { inputStore } from '$lib/utils/state.svelte';
	import { getIconSrc, round2DP } from '$lib/utils/helpers';

	let surplus = $state<[string, number][]>([]);

	$effect(() => {
		try {
			const surplusEntries = Object.entries(inputStore.surplus);
			const { identifier, amount } = inputStore.data!;
			surplusEntries.forEach((entry, index) => {
				if (entry[0] === identifier) entry[1] -= amount;
				if (entry[1] === 0) surplusEntries.splice(index, 1);
			});
			surplus = surplusEntries;
		} catch (e) {
			console.error(e);
		}
	});
</script>

{#if surplus.length}
	<div class="flex flex-wrap gap-x-4 gap-y-2">
		{#each surplus as resource}
			<div class="flex items-center gap-1">
				<img class="max-h-6 max-w-6" src={getIconSrc(resource[0])} alt="" />
				<p class="text-red-500">x {round2DP(resource[1])}</p>
			</div>
		{/each}
	</div>
{/if}
