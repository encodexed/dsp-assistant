<script lang="ts">
	import type { BuildingSelection, InputBuilding } from '$lib/types';
	import { getIconSrc, round2DP } from '$lib/utils/helpers';
	import { inputStore, buildingSelections } from '$lib/utils/state.svelte';

	let { identifier, amount, buildings } = $props();

	const displayedBuilding = (
		selectedBuildings: BuildingSelection,
		buildings: InputBuilding[]
	): InputBuilding | null => {
		const selectedArr = Object.values(selectedBuildings);
		const s = buildings.find((b) => selectedArr.includes(b.identifier));
		if (s) return s;
		if (buildings.length) return buildings[0];
		return null;
	};

	let shown: InputBuilding | null = $derived(displayedBuilding(buildingSelections, buildings));

	let buildingCount: number = $derived.by(() => {
		if (!shown) return 0;
		return inputStore.isPrecise ? round2DP(shown.amountRequired) : Math.ceil(shown.amountRequired);
	});

	// Slightly bugged while precision mode is active
	const calculatePowerConsumption = () => {
		const powerConsumption = shown
			? buildingCount * shown.powerUsageKW
			: buildingCount * buildings[0].powerUsageKW;
		const digits = powerConsumption.toString().length;
		if (digits <= 3) return powerConsumption + ' KW';
		if (digits <= 6) return round2DP(powerConsumption / 1000) + ' MW';
		return round2DP(powerConsumption / 100000) + ' GW';
	};
</script>

<div
	class="flex h-14 min-w-36 max-w-48 overflow-hidden rounded-2xl border-2 border-yellow-500 bg-gray-800"
>
	<div class="relative h-full w-14 border-r border-r-yellow-500">
		<img class="h-full w-full p-[10px]" src={getIconSrc(identifier)} alt="b1" />
		<p
			class="absolute bottom-0 right-0.5 select-none bg-transparent text-xs tracking-tight text-cyan-300 drop-shadow-[0_0_1px_rgba(34,211,288,1)]"
		>
			{amount}
		</p>
	</div>
	<div class="flex flex-col justify-between p-1 text-xs tracking-tight text-stone-100">
		{#if shown}
			<span class="flex items-center gap-1">
				<img class="h-6 w-6" src={getIconSrc(shown.identifier)} alt="" />x {buildingCount}</span
			>
			<span class="flex items-center gap-1">
				<img class="h-5 w-5" src="/icons/power.svg" alt="" />{calculatePowerConsumption()}</span
			>
		{/if}
	</div>
</div>
