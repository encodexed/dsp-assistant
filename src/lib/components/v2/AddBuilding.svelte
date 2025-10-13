<script lang="ts">
	import BuildingButton from './BuildingButton.svelte';
	import { buildings, type Building } from '$lib/constants/exports';

	const buildingIds: number[] = [40, 41, 42, 43, 44, 45, 46, 31, 32, 37, 38, 47, 48];

	let selectedBuilding = $state<Building | null>(null);
</script>

<div class="flex w-3/4 flex-wrap items-center justify-center gap-2">
	{#each buildingIds as id (buildings[id].src)}
		<BuildingButton
			src={buildings[id].src}
			onclick={() => (selectedBuilding = buildings[id])}
			isSelected={selectedBuilding?.id === id}
		/>
	{/each}
</div>
