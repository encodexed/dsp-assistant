<script lang="ts">
	let { children, heading, h = 100 } = $props();
	let visible = $state(false);

	const toggleVisibility = () => {
		visible = !visible;
	};
</script>

<div class="no-select w-full border">
	<button
		type="button"
		onclick={toggleVisibility}
		class="flex w-full items-center justify-between px-1"
	>
		<h6 class="tracking-wide text-gray-300">{heading}</h6>
		{#if visible}
			<img class="h-3 w-3" src="/icons/minus.png" alt="" />
		{:else}
			<img class="h-3 w-3" src="/icons/plus.png" alt="" />
		{/if}
	</button>
	<div
		style={visible ? `height: ${h}px;` : ''}
		class="h-0 overflow-scroll transition-all duration-300"
	>
		<div class="p-1">
			{@render children()}
		</div>
	</div>
</div>
