<script lang="ts">
	import OutputForm from '$lib/components/OutputForm.svelte';
	import OutputTable from '$lib/components/OutputTable.svelte';
	import type { Product } from '$lib/types';
	import calculateSteps from '$lib/utils/calculateSteps';
	import sortInputs from '$lib/utils/sortInputs';
	import { inputStore } from '$lib/utils/state.svelte';

	let output = $state<Product>({
		identifier: 'c7',
		amount: 60
	});

	const handleCalculate = () => {
		const input = calculateSteps(output);
		inputStore.data = input;
		inputStore.ui = sortInputs(input);
	};
</script>

<main class="h-100 w-100 flex flex-col items-center gap-2 text-sm">
	<h1 class="bold text-center text-3xl">DSP</h1>
	<p>What are you trying to achieve today?</p>
	<OutputForm bind:output {handleCalculate} />
	{#if inputStore.ui}
		<OutputTable />
	{/if}
</main>
