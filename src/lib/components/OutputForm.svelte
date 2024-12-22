<script lang="ts">
	import type { ProductSelection } from '$lib/types';
	import components from '$lib/constants/components.json';
	import buildings from '$lib/constants/buildings.json';
	import { onMount } from 'svelte';
	import { outputStore, inputStore } from '$lib/utils/state.svelte';
	import { getData } from '$lib/utils/calculateSteps';
	import SelectableOutput from './SelectableOutput.svelte';

	let { handleCalculate } = $props();

	const getOutputSelections = () => {
		const selections: ProductSelection[] = [];
		components.data.forEach((c) => {
			const { name, src, id, from_recipes } = c;
			if (from_recipes.length) {
				selections.push({
					name,
					src,
					identifier: `c${id}`
				});
			}
		});
		buildings.data.forEach((b) => {
			const { name, src, id, from_recipes } = b;
			if (from_recipes.length) {
				selections.push({
					name,
					src,
					identifier: `b${id}`
				});
			}
		});
		return selections;
	};

	const handleDifferentProduct = (id: string) => {
		inputStore.recipeAlterations = [];
		outputStore.identifier = id;
	};

	const outputSelections = getOutputSelections();

	onMount(() => handleCalculate());
</script>

<form class="flex w-2/3 flex-col items-center gap-1 text-gray-800" action="/">
	<div class="flex h-8 gap-2">
		<div class="flex flex-col justify-center">
			<input
				id="amount"
				bind:value={outputStore.amount}
				onchange={handleCalculate}
				class="w-20 rounded border border-gray-300 px-2 py-1"
				type="number"
				min="1"
			/>
		</div>
		<div class="flex items-center">
			<img class="h-10 w-10" src={getData(outputStore.identifier).src} alt="" />
		</div>
		<div class="flex items-center">
			<p class="text-stone-100">/ minute</p>
		</div>
	</div>
	<div class="flex flex-wrap">
		{#each outputSelections as s}
			<SelectableOutput
				identifier={s.identifier}
				src={s.src}
				clickHandler={handleDifferentProduct}
			/>
		{/each}
	</div>
</form>
