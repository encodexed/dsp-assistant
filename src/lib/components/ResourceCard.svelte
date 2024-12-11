<script lang="ts">
	import type { Input } from '$lib/types';
	import { getIconSrc, getQuickName } from '$lib/utils/helpers';
	import BuildingReadOut from './BuildingReadOut.svelte';

	let {
		inputUI,
		isPrecise,
		selectedBuildings
	}: { inputUI: Input[][]; isPrecise: boolean; selectedBuildings: { assembler: string } } =
		$props();
</script>

<div class="flex h-60 w-full flex-col items-center gap-2 p-4">
	{#each inputUI as tier}
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
						<BuildingReadOut buildings={t.requiredBuildings} {isPrecise} {selectedBuildings} />
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
