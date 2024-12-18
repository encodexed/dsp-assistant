<script lang="ts">
	import type { ProductSelection } from '$lib/types';
	import components from '$lib/constants/components.json';
	import buildings from '$lib/constants/buildings.json';
	import { onMount } from 'svelte';

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
			const { name, src, id } = b;
			selections.push({
				name,
				src,
				identifier: `b${id}`
			});
		});
		return selections;
	};

	let { output = $bindable(), handleCalculate } = $props();
	const outputSelections = getOutputSelections();

	onMount(() => handleCalculate());
</script>

<form class="text-gray-800" action="/">
	<div class="flex h-8 gap-2">
		<div class="flex flex-col justify-center">
			<input
				id="amount"
				bind:value={output.amount}
				onchange={handleCalculate}
				class="w-20 rounded border border-gray-300 px-2 py-1"
				type="number"
				min="1"
			/>
		</div>
		<select
			id="selectionDropdown"
			bind:value={output.identifier}
			onchange={handleCalculate}
			class="rounded border border-gray-300 px-2 py-1"
		>
			{#each outputSelections as choice}
				<option value={choice.identifier}>{choice.name}</option>
			{/each}
		</select>
		<div class="flex items-center">
			<p class="text-stone-100">/ minute</p>
		</div>
	</div>
</form>
