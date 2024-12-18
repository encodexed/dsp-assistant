<script lang="ts">
	import type { Stack } from '$lib/types';
	import { formatPower, getIconSrc, round2DP } from '$lib/utils/helpers';
	import { inputStore } from '$lib/utils/state.svelte';

	let { input, index }: { input: Stack; index: number } = $props();

	let buildingCount: number = $derived.by(() => {
		if (!input.requiredBuildings) return 0;
		return inputStore.isPrecise
			? round2DP(input.requiredBuildings.amountRequired)
			: Math.ceil(input.requiredBuildings.amountRequired);
	});

	const calculatePowerConsumption = () => {
		const powerConsumption = input.requiredBuildings
			? buildingCount * input.requiredBuildings.powerUsageKW
			: 0;
		return formatPower(powerConsumption);
	};

	const toggleVisibility = () => {
		console.log({ index });
	};
</script>

{#if input.isShown}
	<button
		type="button"
		style={`margin-left: ${(input.tier - 1) * 25}px`}
		class="flex items-center gap-1"
		onclick={() => toggleVisibility()}
	>
		<img class="h-6 w-6" src="/icons/down-chevron.png" alt="" />

		<div
			class="flex h-10 min-w-40 items-center overflow-hidden rounded-2xl border-2 border-emerald-600 bg-gray-800 text-xs"
		>
			<div id="productSource" class="flex h-full w-10 items-center justify-center p-1 pr-0">
				<img src={getIconSrc(input.identifier)} alt="" />
			</div>
			<div class="-ml-1 flex h-full items-end">
				<p id="amount" class="select-none text-cyan-300 drop-shadow-[0_0_1px_rgba(34,211,288,1)]">
					{input.amount}
				</p>
			</div>
			<img class="h-6 w-8" src="/icons/left-arrow.png" alt="" />
			<div id="requiredBuildings" class="flex h-full gap-1 p-1">
				<img
					class="h-6 w-6"
					src={getIconSrc(input.requiredBuildings?.identifier || 'c111')}
					alt=""
				/>
			</div>
			<div class="-m-1 flex h-full items-end">
				<p id="amount" class="select-none text-cyan-300 drop-shadow-[0_0_1px_rgba(34,211,288,1)]">
					{#if input.requiredBuildings && input.requiredBuildings.identifier === 'b11'}
						x
					{:else}
						{buildingCount}
					{/if}
				</p>
			</div>
			<div id="power" class="flex h-full gap-1 p-1">
				<img class="h-5 w-5" src="/icons/power.svg" alt="" />
			</div>
			<div class="-m-1 flex h-full items-end">
				<p id="amount" class="select-none text-amber-400 drop-shadow-[0_0_1px_rgba(251,191,36,1)]">
					{calculatePowerConsumption()}
				</p>
			</div>
		</div>
	</button>
{/if}
