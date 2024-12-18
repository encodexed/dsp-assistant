<script lang="ts">
	import { formatPower, getIconSrc, round2DP } from '$lib/utils/helpers';
	import { inputStore } from '$lib/utils/state.svelte';

	let { identifier, amount, buildings } = $props();

	let buildingCount: number = $derived.by(() => {
		if (!buildings) return 0;
		return inputStore.isPrecise
			? round2DP(buildings.amountRequired)
			: Math.ceil(buildings.amountRequired);
	});

	const calculatePowerConsumption = () => {
		const powerConsumption = buildings
			? buildingCount * buildings.powerUsageKW
			: buildingCount * buildings[0].powerUsageKW;
		return formatPower(powerConsumption);
	};
</script>

<div
	class="flex h-8 min-w-40 items-center overflow-hidden rounded-2xl border-2 border-emerald-600 bg-gray-800 text-xs"
>
	<div id="productSource" class="flex h-full w-8 items-center justify-center p-0.5 pr-0">
		<img src={getIconSrc(identifier)} alt="" />
	</div>
	<div class="-ml-0.5 flex h-full items-end border-r border-r-emerald-600 pr-0.5">
		<p id="amount" class="select-none text-cyan-300 drop-shadow-[0_0_1px_rgba(34,211,288,1)]">
			{amount}
		</p>
	</div>
	<div id="buildings" class="flex h-full gap-1 p-0.5">
		<img class="h-6 w-6" src={getIconSrc(buildings.identifier)} alt="" />
	</div>
	<div class="-m-0.5 flex h-full items-end border-r border-r-emerald-600 pr-0.5">
		<p id="amount" class="select-none text-cyan-300 drop-shadow-[0_0_1px_rgba(34,211,288,1)]">
			{buildingCount}
		</p>
	</div>
	<div id="power" class="flex h-full gap-1 p-0.5">
		<img class="h-5 w-5" src="/icons/power.svg" alt="" />
	</div>
	<div class="-m-0.5 flex h-full items-end">
		<p id="amount" class="select-none text-amber-400 drop-shadow-[0_0_1px_rgba(251,191,36,1)]">
			{calculatePowerConsumption()}
		</p>
	</div>
</div>
