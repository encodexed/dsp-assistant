<script lang="ts">
	import { inputStore } from '$lib/utils/state.svelte';
	import ResourceCard from './ResourceCard.svelte';

	const alterSubTiers = (index: number, show: boolean) => {
		if (!inputStore.ui) return;
		const breakTier = inputStore.ui[index].tier;
		for (let i = index + 1; i < inputStore.ui.length; i++) {
			const { tier } = inputStore.ui[i];
			if (tier <= breakTier) return;
			// If trying to reveal
			if (show) {
				if (tier == breakTier + 1) {
					inputStore.ui[i].isShown = true;
					inputStore.ui[i].isExpanded = false;
				}
			} else {
				// If trying to hide
				inputStore.ui[i].isShown = false;
				inputStore.ui[i].isExpanded = false;
			}
		}
	};

	const alterVisibility = (index: number) => {
		if (!inputStore.ui) return;

		// Reverse the isExpanded property
		inputStore.ui[index].isExpanded = !inputStore.ui[index].isExpanded;

		// Toggle visibility
		alterSubTiers(index, inputStore.ui[index].isExpanded);
	};

	const alterAllNodes = (show: boolean) => {
		inputStore.uiExpanded = show;
		inputStore.ui!.forEach((node, index) => {
			if (!index) {
				node.isShown = true;
			} else {
				node.isShown = show;
			}
			node.isExpanded = show;
		});
	};
</script>

{#if inputStore.ui}
	<div class="flex gap-2">
		<button
			type="button"
			class="rounded bg-white px-2 py-0.5 text-sm text-gray-600"
			onclick={() => alterAllNodes(true)}>Expand all</button
		>
		<button
			type="button"
			class="rounded bg-white px-2 py-0.5 text-sm text-gray-600"
			onclick={() => alterAllNodes(false)}>Collapse all</button
		>
	</div>
	<div class="flex w-full flex-col gap-2 p-4">
		{#each inputStore.ui as input, index}
			<ResourceCard {input} {index} {alterVisibility} />
		{/each}
	</div>
{/if}
