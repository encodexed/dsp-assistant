<script lang="ts">
	let { actions } = $props();
</script>

<div class="flex justify-center gap-2">
	{#each actions as action}
		{#if action.type === 'primary'}
			<button
				class="rounded border border-black bg-blue-500 px-4 py-1 text-white"
				type="button"
				onclick={action.handler}>{action.text}</button
			>
		{:else}
			<button
				class="rounded border border-black bg-stone-200 px-4 py-1 text-stone-700"
				type="button"
				onclick={action.handler}>{action.text}</button
			>
		{/if}
	{/each}
</div>
