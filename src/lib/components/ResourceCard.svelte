<script lang="ts">
	import { getIconSrc, getQuickName } from '$lib/utils/helpers';
	import BuildingReadOut from './BuildingReadOut.svelte';
	import { inputStore } from '$lib/utils/state.svelte';
</script>

{#if inputStore.ui}
	<div class="flex h-60 w-full flex-col items-center gap-2 p-4">
		{#each inputStore.ui as tier}
			<div class="flex w-full justify-around border border-red-300">
				{#each tier as t}
					<div
						class="mx-1 flex h-24 w-48 flex-col rounded-lg border border-blue-500 text-xs text-black"
					>
						<div class="flex w-full rounded-lg border border-green-300">
							<img class="h-8 w-8 border" src={getIconSrc(t.identifier)} alt="" />
							<p>
								{t.amount} x
								{getQuickName(t.identifier)}
							</p>
						</div>
						<div class="flex w-full flex-col rounded-lg border border-purple-300">
							<BuildingReadOut buildings={t.requiredBuildings} />
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}
