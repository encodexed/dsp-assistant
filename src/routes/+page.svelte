<script lang="ts">
	import buildings from '$lib/constants/buildings.json';
	import components from '$lib/constants/components.json';
	import Actions from '$lib/components/Actions.svelte';
	import type { Output, ButtonAction, Input, ProductSelection } from '$lib/types';
	import calculateSteps, { getData } from '$lib/utils/calculateSteps';
	import sortInputs from '$lib/utils/sortInputs';

	// const cancelBtn = '/icons/red-cross.svg';
	let input = $state<Input>();

	let inputUI = $derived.by(() => {
		if (input) {
			return sortInputs(input);
		}
		return null;
	});

	let outputSelections = $derived.by(() => {
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
	});

	let output = $state<Output>({
		rate: 'min',
		product: {
			identifier: 'c7',
			amount: 60
		}
	});

	const handleCalculate = () => {
		input = calculateSteps(output);
	};

	export const getQuickName = (identifier: string) => {
		return getData(identifier).name;
	};

	const actions: ButtonAction[] = [
		{
			icon: '',
			text: 'Calculate',
			type: 'primary',
			handler: handleCalculate
		}
	];
</script>

<main class="h-100 w-100 flex flex-col items-center gap-2">
	<h1 class="bold text-center text-3xl">DSP</h1>
	<p>What are you trying to achieve today?</p>
	<form action="/">
		<div class="flex h-8 gap-2">
			<input
				bind:value={output.product.amount}
				class="h-full w-16 rounded border border-gray-300 px-2 py-1"
				type="text"
			/>
			<select
				id="selectionDropdown"
				bind:value={output.product.identifier}
				class="h-full rounded border border-gray-300 px-2 py-1"
			>
				{#each outputSelections as choice}
					<option value={choice.identifier}>{choice.name}</option>
				{/each}
			</select>
			<Actions {actions} />
		</div>
	</form>
	{#if inputUI}
		<div class="box-border flex h-60 w-full flex-col items-center border p-4">
			{#each inputUI as tier}
				<div class="box-border flex w-full justify-around border">
					{#each tier as t}
						<div class="rounded-lg border bg-blue-500 px-2 py-0.5 text-xs text-white">
							{t.amount}
							{getQuickName(t.identifier)}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</main>
