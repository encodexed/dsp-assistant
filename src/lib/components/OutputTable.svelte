<script lang="ts">
	import { getQuickName } from '$lib/utils/helpers';

	let { inputUI } = $props();
</script>

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
