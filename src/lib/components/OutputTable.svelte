<script lang="ts">
	import ResourceCards from './ResourceCards.svelte';
	import SelectBuildingType from './SelectBuildingType.svelte';
	import { assemblers, smelters, miners, plants, labs } from '$lib/constants/buildingTypes';
	import { inputStore, buildingSelections } from '$lib/utils/state.svelte';
	import TotalRequirements from './TotalRequirements.svelte';
	import TotalResources from './TotalResources.svelte';
	import Surplus from './Surplus.svelte';
</script>

{#if inputStore.ui}
	<div>
		<input id="precision" type="checkbox" bind:checked={inputStore.isPrecise} />
		<label class="text-sm" for="precision">Show more precise values</label>
	</div>
	<div class="flex p-2">
		<div class="border p-2">
			<h4>Assemblers</h4>
			<SelectBuildingType
				name={'assemblers'}
				range={assemblers}
				bind:state={buildingSelections.assemblers}
			/>
		</div>
		<div class="border p-2">
			<h4>Smelters</h4>
			<SelectBuildingType
				name={'smelters'}
				range={smelters}
				bind:state={buildingSelections.smelters}
			/>
		</div>
		<div class="border p-2">
			<h4>Miners</h4>
			<SelectBuildingType name={'miners'} range={miners} bind:state={buildingSelections.miners} />
		</div>
		<div class="border p-2">
			<h4>Chemical Plants</h4>
			<SelectBuildingType name={'plants'} range={plants} bind:state={buildingSelections.plants} />
		</div>
		<div class="border p-2">
			<h4>Labs</h4>
			<SelectBuildingType name={'labs'} range={labs} bind:state={buildingSelections.labs} />
		</div>
	</div>
	<TotalRequirements />
	<TotalResources />
	<Surplus />
	<ResourceCards />
{/if}
