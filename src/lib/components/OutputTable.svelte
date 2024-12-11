<script lang="ts">
	import type { Input } from '$lib/types';
	import ResourceCard from './ResourceCard.svelte';
	import SelectBuildingType from './SelectBuildingType.svelte';
	import { assemblers } from '$lib/constants/buildingTypes';

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
	<SelectBuildingType name={'assemblers'} range={assemblers} bind:state={assemblerType} />
	<ResourceCard {inputUI} {isPrecise} {selectedBuildings} />
{/if}
