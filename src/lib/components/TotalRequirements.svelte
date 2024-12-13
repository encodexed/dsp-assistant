<script lang="ts">
	import { assemblers } from '$lib/constants/buildingTypes';
	import type { InputBuilding } from '$lib/types';
	import { formatPower, getIconSrc, getSelectedBuilding } from '$lib/utils/helpers';
	import { inputStore, buildingSelections } from '$lib/utils/state.svelte';
	import { onMount } from 'svelte';

	type Totals = {
		power: number;
		assemblers: number;
	};

	let totals = $state<Totals | null>();

	$effect(() => {
		recalculateTotals();
	});

	const recalculateTotals = () => {
		const { ui } = inputStore;
		const flat = ui?.flat();

		const results: Totals = {
			power: 0,
			assemblers: 0
		};

		if (!flat) return results;

		flat.forEach((item) => {
			const { requiredBuildings } = item;
			const building: InputBuilding | null = getSelectedBuilding(
				requiredBuildings,
				buildingSelections
			);

			if (building) {
				results.power += building.amountRequired * building.powerUsageKW;
				results.assemblers += assemblers.includes(building.identifier)
					? Math.ceil(building.amountRequired)
					: 0;
			}
		});

		totals = results;
	};
</script>

{#if inputStore.ui && totals}
	<div class="flex gap-2 border-2 border-white p-2">
		<h3 class="bold">Totals:</h3>
		<img class="h-5 w-5" src="/icons/power.svg" alt="" />
		<p>{formatPower(totals.power)}</p>
		<img class="h-5 w-5" src={getIconSrc(buildingSelections.assemblers)} alt="" />
		<p>x {totals.assemblers}</p>
	</div>
{/if}
