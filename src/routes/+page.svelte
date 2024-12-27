<script lang="ts">
	import OutputForm from '$lib/components/OutputForm.svelte';
	import OutputTable from '$lib/components/OutputTable.svelte';
	import calculateSteps from '$lib/utils/calculateSteps';
	import stackInputs from '$lib/utils/stackInputs';
	import { outputStore, inputStore, buildingSelections } from '$lib/utils/state.svelte';
	import tallyProductStats from '$lib/utils/tallyProductStats';

	// Force a recalculation when building selections change
	$effect(() => {
		if (buildingSelections) handleCalculate();
	});

	const handleCalculate = () => {
		console.warn('Calculating...');
		console.log($state.snapshot(outputStore));
		const input = calculateSteps(outputStore, inputStore.recipeAlterations);
		console.log({ input });
		inputStore.data = input;
		const stackedInputs = stackInputs(input, inputStore.uiExpanded);
		console.log({ stackedInputs });
		inputStore.ui = stackedInputs;
		const stats: { surplus: Record<string, number>; totals: Record<string, number> } =
			tallyProductStats(stackedInputs);
		console.log({ stats });
		inputStore.totals = stats.totals;
		inputStore.surplus = stats.surplus;
	};
</script>

<main class="flex h-full w-full flex-col items-center gap-2 text-sm text-stone-100">
	<h1 class="bold text-center text-3xl">DSP</h1>
	<p>What are you trying to achieve today?</p>
	<OutputForm {handleCalculate} />
	{#if inputStore.ui}
		<OutputTable />
	{/if}
</main>
