<script lang="ts">
	import type { Input } from '$lib/types';
	import { getIconSrc, getQuickName } from '$lib/utils/helpers';
	import BuildingReadOut from './BuildingReadOut.svelte';

	let { inputUI }: { inputUI: Input[][] | null } = $props();
	let isPrecise = $state(false);
	let assemblerType = $state('b1');

	let selectedBuildings = $derived.by(() => {
		return {
			assembler: assemblerType
		};
	});
</script>

{#if inputUI}
	<div>
		<input id="precision" type="checkbox" bind:checked={isPrecise} />
		<label class="text-sm" for="precision">Show more precise values</label>
	</div>
	<div class="flex gap-2">
		<div class="flex">
			<input type="radio" name="assembler" value="b1" id="amk1" bind:group={assemblerType} />
			<label for="amk1"><img class="h-8 w-8" src={getIconSrc('b1')} alt="" /></label>
		</div>
		<div class="flex">
			<input type="radio" name="assembler" value="b4" id="amk2" bind:group={assemblerType} />
			<label for="amk2"><img class="h-8 w-8" src={getIconSrc('b4')} alt="" /></label>
		</div>
		<div class="flex">
			<input type="radio" name="assembler" value="b5" id="amk3" bind:group={assemblerType} />
			<label for="amk3"><img class="h-8 w-8" src={getIconSrc('b5')} alt="" /></label>
		</div>
	</div>
	<div class="flex h-60 w-full flex-col items-center gap-2 p-4">
		{#each inputUI as tier}
			<div class="flex w-full justify-around">
				{#each tier as t}
					<div
						class="mx-1 flex h-24 w-48 flex-col rounded-lg border border-blue-500 px-2 py-2 text-xs text-black"
					>
						<div class="flex w-full rounded-lg bg-white px-2 py-0.5 text-black">
							<img class="h-8 w-8 border" src={getIconSrc(t.identifier)} alt="" />
							<p>
								{t.amount}
								{getQuickName(t.identifier)}
							</p>
						</div>
						<BuildingReadOut buildings={t.requiredBuildings} {isPrecise} {selectedBuildings} />
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}
