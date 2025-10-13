<script lang="ts">
	import { ProductionRow } from '$lib/class/Production.svelte';
	import Row from '$lib/components/v2/Row.svelte';
	let productionLine: ProductionRow[] = $state([]);
</script>

<div class="flex flex-col items-center gap-2 p-2">
	<div class="text-2xl font-semibold">Manual line tool</div>

	<section class="flex min-h-40 w-full flex-col p-2">
		{#each productionLine as row (row.id)}
			<Row />
		{/each}
	</section>

	<button
		class="m-4 rounded-md border border-white p-2"
		onclick={() => productionLine.push(new ProductionRow())}>Add row</button
	>
</div>
