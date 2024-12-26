<script lang="ts">
	import { getIconSrc } from '$lib/utils/helpers';
	import { inputStore } from '$lib/utils/state.svelte';
	import { round2DP } from '$lib/utils/helpers';

	let totals = $state<[string, number][]>([]);

	$effect(() => {
		totals = Object.entries(inputStore.totals);
	});
</script>

{#if totals.length}
	<div class="flex h-full flex-wrap gap-x-4 gap-y-2">
		{#each totals as resource}
			<div class="flex items-center gap-1">
				<img class="max-h-6 max-w-6" src={getIconSrc(resource[0])} alt="" />
				<p>x {round2DP(resource[1])}</p>
			</div>
		{/each}
	</div>
{/if}
