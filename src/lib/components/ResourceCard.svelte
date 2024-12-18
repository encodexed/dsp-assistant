<script lang="ts">
	import type { Stack } from '$lib/types';
	import { formatPower, getIconSrc, round2DP } from '$lib/utils/helpers';
	import { inputStore } from '$lib/utils/state.svelte';

	let {
		input,
		index,
		alterVisibility
	}: { input: Stack; index: number; alterVisibility: (index: number) => void } = $props();

	let buildingCount: number = $derived.by(() => {
		if (!input.requiredBuildings) return 0;
		return inputStore.isPrecise
			? round2DP(input.requiredBuildings.amountRequired)
			: Math.ceil(input.requiredBuildings.amountRequired);
	});

	const calculatePowerConsumption = () => {
		const powerConsumption = input.requiredBuildings
			? round2DP(buildingCount * input.requiredBuildings.powerUsageKW)
			: 0;
		return formatPower(powerConsumption);
	};
</script>

{#if input.isShown}
	<button
		type="button"
		style={`margin-left: ${(input.tier - 1) * 30}px`}
		class="flex w-fit items-center gap-1"
		onclick={() => alterVisibility(index)}
	>
		{#if !input.isLowestTier}
			{#if input.isExpanded}
				<img class="h-6 w-6" src="/icons/minus.png" alt="" />
			{:else}
				<img class="h-6 w-6" src="/icons/plus.png" alt="" />
			{/if}
		{:else}
			<div class="h-6 w-6"></div>
		{/if}

		<div
			class="flex h-10 min-w-40 items-center overflow-hidden rounded-2xl border-2 border-emerald-600 bg-gray-800 pr-3 text-xs"
		>
			<div id="productSource" class="flex h-full w-10 items-center justify-center p-1 pr-0">
				<img src={getIconSrc(input.identifier)} alt="" />
			</div>
			<div class="-ml-1 flex h-full items-end">
				<p id="amount" class="select-none text-cyan-300 drop-shadow-[0_0_1px_rgba(34,211,288,1)]">
					{round2DP(input.amount)}
				</p>
			</div>
			<img class="h-6 w-8" src="/icons/left-arrow.png" alt="" />
			<div id="requiredBuildings" class="flex h-full gap-1 p-1">
				<img
					class="max-h-10 max-w-10"
					src={getIconSrc(input.requiredBuildings?.identifier || 'c111')}
					alt=""
				/>
			</div>
			<div class="-m-1 flex h-full items-end">
				<p id="amount" class="select-none text-cyan-300 drop-shadow-[0_0_1px_rgba(34,211,288,1)]">
					{#if input.requiredBuildings && input.requiredBuildings.identifier === 'b11'}
						x
					{:else}
						{round2DP(buildingCount)}
					{/if}
				</p>
			</div>
			<div class="flex items-center gap-1">
				<div id="power" class="ml-2 flex h-full gap-1 p-1">
					<img class="h-6 w-6" src="/icons/buildings/b5.png" alt="" />
				</div>
				<div class="-m-1 flex h-full items-end">
					<p
						id="amount"
						class="select-none text-amber-400 drop-shadow-[0_0_1px_rgba(251,191,36,1)]"
					>
						{calculatePowerConsumption()}
					</p>
				</div>
			</div>
		</div>
	</button>
{/if}
