<script lang="ts">
	import type { Input } from '$lib/types';
	import { getQuickName } from '$lib/utils/helpers';

	let { inputUI }: { inputUI: Input[][] | null } = $props();

	$effect(() => console.log($state.snapshot(inputUI)));
</script>

{#if inputUI}
	<div class="box-border flex h-60 w-full flex-col items-center border p-4">
		{#each inputUI as tier}
			<div class="box-border flex w-full justify-around border">
				{#each tier as t}
					<div class="flex flex-col rounded-lg border bg-blue-500 px-2 py-0.5 text-xs text-white">
						<div>
							{t.amount}
							{getQuickName(t.identifier)}
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}
