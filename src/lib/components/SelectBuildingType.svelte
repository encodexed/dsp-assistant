<script lang="ts">
	import { getIconSrc } from '$lib/utils/helpers';

	let {
		name,
		range,
		state = $bindable()
	}: { name: string; range: string[]; state: string } = $props();
</script>

<div class="flex gap-2">
	{#each range as selectable}
		<div class="flex">
			<input type="radio" {name} value={selectable} id={selectable} bind:group={state} />
			<label for={selectable}
				><img class="h-8 w-8" src={getIconSrc(selectable)} alt={selectable} /></label
			>
		</div>
	{/each}
</div>
