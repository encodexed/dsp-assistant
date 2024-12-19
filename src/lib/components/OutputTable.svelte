<script lang="ts">
	import ResourceCards from './ResourceCards.svelte';
	import SelectBuildingType from './SelectBuildingType.svelte';
	import { assemblers, smelters, miners, plants, labs } from '$lib/constants/buildingTypes';
	import { inputStore, buildingSelections } from '$lib/utils/state.svelte';
	import TotalRequirements from './TotalRequirements.svelte';

	type Selections = {
		name: string;
		range: string[];
		state: string;
	};

	const selections: Selections[] = [
		{
			name: 'assemblers',
			range: assemblers,
			state: buildingSelections.assemblers
		},
		{
			name: 'smelters',
			range: smelters,
			state: buildingSelections.assemblers
		},
		{
			name: 'miners',
			range: miners,
			state: buildingSelections.miners
		},
		{
			name: 'plants',
			range: plants,
			state: buildingSelections.plants
		},
		{
			name: 'labs',
			range: labs,
			state: buildingSelections.labs
		}
	];
</script>

{#if inputStore.ui}
	<div>
		<input id="precision" type="checkbox" bind:checked={inputStore.isPrecise} />
		<label class="text-sm" for="precision">Show more precise values</label>
	</div>
	<div class="flex p-2">
		{#each selections as s}
			<div class="border p-2">
				<h4>{s.name.toUpperCase()}</h4>
				<SelectBuildingType name={s.name} range={s.range} bind:state={s.state} />
			</div>
		{/each}
	</div>
	<TotalRequirements />
	<ResourceCards />
{/if}
