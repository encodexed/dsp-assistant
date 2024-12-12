<script lang="ts">
	import ResourceCards from './ResourceCards.svelte';
	import SelectBuildingType from './SelectBuildingType.svelte';
	import { assemblers } from '$lib/constants/buildingTypes';
	import { inputStore, buildingSelections } from '$lib/utils/state.svelte';
</script>

{#if inputStore.ui}
	<div>
		<input id="precision" type="checkbox" bind:checked={inputStore.isPrecise} />
		<label class="text-sm" for="precision">Show more precise values</label>
	</div>
	<SelectBuildingType
		name={'assemblers'}
		range={assemblers}
		bind:state={buildingSelections.assemblers}
	/>
	<ResourceCards />
{/if}
