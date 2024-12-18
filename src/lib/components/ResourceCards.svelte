<script lang="ts">
	import { inputStore } from '$lib/utils/state.svelte';
	import ResourceCard from './ResourceCard.svelte';

	const alterSubTiers = (index: number, isShown: boolean) => {
		if (!inputStore.ui) return;
		const breakTier = inputStore.ui[index].tier;
		for (let i = index + 1; i < inputStore.ui.length; i++) {
			if (inputStore.ui[i].tier <= breakTier) return;
			else {
				inputStore.ui[i].isShown = isShown;
				inputStore.ui[i].isExpanded = isShown;
			}
		}
	};

	const alterVisibility = (index: number) => {
		// Ignore last element of UI
		if (!inputStore.ui || inputStore.ui.length - 1 === index) return;

		// Reverse the isExpanded property
		inputStore.ui[index].isExpanded = !inputStore.ui[index].isExpanded;

		// Toggle visibility
		alterSubTiers(index, inputStore.ui[index].isExpanded);
		console.log($state.snapshot(inputStore));
	};
</script>

{#if inputStore.ui}
	<div class="flex w-full flex-col gap-2 p-4">
		{#each inputStore.ui as input, index}
			<ResourceCard {input} {index} {alterVisibility} />
		{/each}
	</div>
{/if}
