<script lang="ts">
	import BuildingButton from '$lib/components/v2/BuildingButton.svelte';
	import { buildings } from '$lib/constants/exports';

	const buildingIds: number[] = [40, 41, 42, 43, 44, 45, 46, 31, 32, 37, 38, 47, 48];
</script>

<div class="text-2xl font-semibold">Manual line tool</div>
<div class="flex w-3/4 flex-wrap items-center justify-center gap-2">
	{#each buildingIds as id (buildings[id].src)}
		<BuildingButton src={buildings[id].src} />
	{/each}
</div>

<section class="flex min-h-40 w-full flex-col p-2">
	<div class="flex h-16 w-full border border-blue-800">
		<div class="h-full w-40 border-r border-blue-800 p-1">Line stats here</div>
		<div class="h-full w-[calc(100%-160px)] p-1">Buildings here</div>
	</div>
	<div class="flex h-16 w-full border border-green-800">
		<div class="h-full w-40 border-r border-green-800 p-1">Line stats here</div>
		<div class="h-full w-[calc(100%-160px)] p-1">Buildings here</div>
	</div>
	<div class="flex h-16 w-full border border-yellow-800">
		<div class="h-full w-40 border-r border-yellow-800 p-1">Line stats here</div>
		<div class="h-full w-[calc(100%-160px)] p-1">Buildings here</div>
	</div>
	<div class="flex h-16 w-full border border-purple-800">
		<div class="h-full w-40 border-r border-purple-800 p-1">Line stats here</div>
		<div class="h-full w-[calc(100%-160px)] p-1">Buildings here</div>
	</div>
</section>
