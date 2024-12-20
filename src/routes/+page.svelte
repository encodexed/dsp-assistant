<script lang="ts">
	import OutputForm from '$lib/components/OutputForm.svelte';
	import OutputTable from '$lib/components/OutputTable.svelte';
	import type { Product } from '$lib/types';
	import calculateSteps from '$lib/utils/calculateSteps';
	import stackInputs from '$lib/utils/stackInputs';
	import { inputStore, buildingSelections } from '$lib/utils/state.svelte';

	let output = $state<Product>({
		identifier: 'c36',
		amount: 30
	});

	// Force a recalculation when building selections change
	$effect(() => {
		if (buildingSelections) handleCalculate();
	});

	const handleCalculate = () => {
		console.log('Recalculating...');
		const input = calculateSteps(output, inputStore.recipeAlterations);
		inputStore.data = input;
		inputStore.ui = stackInputs(input, inputStore.uiExpanded);
	};
</script>

<main class="h-100 w-100 flex flex-col items-center gap-2 text-sm text-stone-100">
	<h1 class="bold text-center text-3xl">DSP</h1>
	<p>What are you trying to achieve today?</p>
	<OutputForm bind:output {handleCalculate} />
	{#if inputStore.ui}
		<OutputTable />
	{/if}
</main>
