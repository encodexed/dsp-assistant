<script lang="ts">
	import buildings from '$lib/constants/buildings.json';
	import components from '$lib/constants/components.json';
	import Actions from '$lib/components/Actions.svelte';
	import type { Output, ButtonAction, Input } from '$lib/types';
	import calculateSteps from '$lib/utils/calculateSteps';
	import sortInputs from '$lib/utils/sortInputs';

	const cancelBtn = '/icons/red-cross.svg';
	let input = $state<Input>();

	let inputUI = $derived.by(() => {
		if (input) {
			return sortInputs(input);
		}
		return null;
	});

	let output = $state<Output>({
		rate: 'min',
		products: [
			{
				type: 'component',
				id: 7,
				amount: 60
			}
		]
	});

	let outputUI = $derived.by(() => {
		return output.products.map((p) => {
			if (p.type === 'component') {
				const { name, src, in_recipes, from_recipes } = components.data[p.id];
				return {
					name,
					src,
					amount: p.amount,
					inRecipes: in_recipes,
					fromRecipes: from_recipes
				};
			} else {
				const { name, src } = buildings.data[p.id];
				return {
					name,
					src,
					amount: p.amount
				};
			}
		});
	});

	const handleCalculate = () => {
		const result = calculateSteps(output);
		console.log({ result });
		input = result;
	};

	const handleReset = () => {
		output = {
			rate: 'min',
			products: []
		};
	};

	const handleRemove = (id: number) => {
		output.products.splice(id, 1);
	};

	const actions: ButtonAction[] = [
		{
			icon: '',
			text: 'Calculate',
			type: 'primary',
			handler: handleCalculate
		},
		{
			icon: '',
			text: 'Reset',
			type: 'secondary',
			handler: handleReset
		}
	];
</script>

<main class="h-100 w-100 flex flex-col items-center">
	<h1 class="bold text-center text-3xl">DSP calculator</h1>
	<p>What are you trying to achieve today?</p>
	<Actions {actions} />
	<div class="flex flex-col items-center">
		{#each outputUI as item, index}
			<div class="flex items-center gap-8">
				<img class="h-8 w-8 bg-cover bg-center" src={item.src} alt="" />
				<p>{item.name}</p>
				<p>{item.amount}</p>
				<button type="submit" onclick={() => handleRemove(index)} class="h-6 w-6 bg-center"
					><img src={cancelBtn} alt="" /></button
				>
			</div>
		{/each}
	</div>
	{#if inputUI}
		<!-- {#each tieredInstructions as instruction}{/each} -->
		<div>Successfully calculated something</div>
	{/if}
</main>
