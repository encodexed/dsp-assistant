<script lang="ts">
	import type { InputBuilding } from '$lib/types';
	import { getQuickName } from '$lib/utils/helpers';

	const round2DP = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

	let {
		buildings,
		isPrecise,
		selectedBuildings = $bindable()
	}: {
		buildings: InputBuilding[];
		isPrecise: boolean;
		selectedBuildings: { assembler: string };
	} = $props();

	const displayedBuilding = (
		selectedBuildings: { assembler: string },
		buildings: InputBuilding[]
	): InputBuilding | null => {
		const selectedArr = Object.values(selectedBuildings);
		return buildings.find((b) => selectedArr.includes(b.identifier)) || null;
	};

	let shown: InputBuilding | null = $derived(displayedBuilding(selectedBuildings, buildings));
</script>

{#if shown}
	<div>
		{isPrecise ? round2DP(shown.amountRequired) : Math.ceil(shown.amountRequired)} x
		<span class="font-bold"> {getQuickName(shown.identifier)}s</span>
	</div>
{:else if !shown && buildings.length}
	<div>
		{isPrecise ? round2DP(buildings[0].amountRequired) : Math.ceil(buildings[0].amountRequired)} x
		<span class="font-bold"> {getQuickName(buildings[0].identifier)}s</span>
	</div>
{/if}
