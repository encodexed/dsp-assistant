<script lang="ts">
	import { assemblers, smelters, plants, labs } from '$lib/constants/buildingTypes';
	import { formatPower, getIconSrc } from '$lib/utils/helpers';
	import { inputStore, buildingSelections } from '$lib/utils/state.svelte';

	type Totals = {
		power: number;
		assemblers: number;
		smelters: number;
		plants: number;
		labs: number;
		refineries: number;
		colliders: number;
		collectors: number;
		pumps: number;
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
			assemblers: 0,
			smelters: 0,
			plants: 0,
			labs: 0,
			refineries: 0,
			colliders: 0,
			collectors: 0,
			pumps: 0
		};

		if (!flat) return results;

		flat.forEach((item) => {
			const { requiredBuildings } = item;

			if (requiredBuildings) {
				results.power += requiredBuildings.amountRequired * requiredBuildings.powerUsageKW;
				results.assemblers += assemblers.includes(requiredBuildings.identifier)
					? Math.ceil(requiredBuildings.amountRequired)
					: 0;

				results.smelters += smelters.includes(requiredBuildings.identifier)
					? Math.ceil(requiredBuildings.amountRequired)
					: 0;

				results.plants += plants.includes(requiredBuildings.identifier)
					? Math.ceil(requiredBuildings.amountRequired)
					: 0;

				results.labs += labs.includes(requiredBuildings.identifier)
					? Math.ceil(requiredBuildings.amountRequired)
					: 0;

				results.refineries +=
					requiredBuildings.identifier === 'b35' ? Math.ceil(requiredBuildings.amountRequired) : 0;

				results.colliders +=
					requiredBuildings.identifier === 'b39' ? Math.ceil(requiredBuildings.amountRequired) : 0;

				results.collectors +=
					requiredBuildings.identifier === 'b26' ? Math.ceil(requiredBuildings.amountRequired) : 0;

				results.pumps +=
					requiredBuildings.identifier === 'b33' ? Math.ceil(requiredBuildings.amountRequired) : 0;
			}
		});

		totals = results;
	};
</script>

<div class="flex h-full flex-wrap gap-x-4 gap-y-2">
	{#if inputStore.ui && totals}
		<div class="flex items-center gap-1">
			<img class="max-h-6 max-w-6" src="/icons/buildings/b5.png" alt="" />
			<p>{formatPower(totals.power)}</p>
		</div>
		{#if totals.assemblers}
			<div class="flex items-center gap-1">
				<img class="max-h-6 max-w-6" src={getIconSrc(buildingSelections.assemblers)} alt="" />
				<p>x {totals.assemblers}</p>
			</div>
		{/if}
		{#if totals.smelters}
			<div class="flex items-center gap-1">
				<img class="max-h-6 max-w-6" src={getIconSrc(buildingSelections.smelters)} alt="" />
				<p>x {totals.smelters}</p>
			</div>
		{/if}
		{#if totals.plants}
			<div class="flex items-center gap-1">
				<img class="max-h-6 max-w-6" src={getIconSrc(buildingSelections.plants)} alt="" />
				<p>x {totals.plants}</p>
			</div>
		{/if}
		{#if totals.labs}
			<div class="flex items-center gap-1">
				<img class="max-h-6 max-w-6" src={getIconSrc(buildingSelections.labs)} alt="" />
				<p>x {totals.labs}</p>
			</div>
		{/if}
		{#if totals.refineries}
			<div class="flex items-center gap-1">
				<img class="max-h-6 max-w-6" src={getIconSrc('b35')} alt="" />
				<p>x {totals.refineries}</p>
			</div>
		{/if}
		{#if totals.colliders}
			<div class="flex items-center gap-1">
				<img class="max-h-6 max-w-6" src={getIconSrc('b39')} alt="" />
				<p>x {totals.colliders}</p>
			</div>
		{/if}
		{#if totals.collectors}
			<div class="flex items-center gap-1">
				<img class="max-h-6 max-w-6" src={getIconSrc('b26')} alt="" />
				<p>x {totals.collectors}</p>
			</div>
		{/if}
		{#if totals.pumps}
			<div class="flex items-center gap-1">
				<img class="max-h-6 max-w-6" src={getIconSrc('b33')} alt="" />
				<p>x {totals.pumps}</p>
			</div>
		{/if}
	{/if}
</div>
