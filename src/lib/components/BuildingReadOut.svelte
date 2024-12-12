<script lang="ts">
	import type { BuildingSelection, InputBuilding } from '$lib/types';
	import { getQuickName, round2DP } from '$lib/utils/helpers';
	import { inputStore, buildingSelections } from '$lib/utils/state.svelte';

	let {
		buildings
	}: {
		buildings: InputBuilding[];
	} = $props();

	const displayedBuilding = (
		selectedBuildings: BuildingSelection,
		buildings: InputBuilding[]
	): InputBuilding | null => {
		const selectedArr = Object.values(selectedBuildings);
		return buildings.find((b) => selectedArr.includes(b.identifier)) || null;
	};

	let shown: InputBuilding | null = $derived(displayedBuilding(buildingSelections, buildings));

	let buildingCount: number | null = $derived.by(() => {
		if (!shown && buildings.length) {
			return inputStore.isPrecise
				? round2DP(buildings[0].amountRequired)
				: Math.ceil(buildings[0].amountRequired);
		}
		if (!shown) return null;
		return inputStore.isPrecise ? round2DP(shown.amountRequired) : Math.ceil(shown.amountRequired);
	});
</script>

{#if shown}
	<p>
		{buildingCount} x
		<span class="font-bold"> {getQuickName(shown.identifier)}s</span>
	</p>
	<p>
		{(buildingCount || 0) * shown.powerUsageKW} <span class="font-bold">KW</span>
	</p>
{:else if !shown && buildings.length}
	<p>
		{buildingCount} x
		<span class="font-bold"> {getQuickName(buildings[0].identifier)}s</span>
	</p>
	<p>
		{(buildingCount || 0) * buildings[0].powerUsageKW} <span class="font-bold">KW</span>
	</p>
{/if}
