<script lang="ts">
	let { children, heading, h = 100 } = $props();
	let visible = $state(false);

	const toggleVisibility = () => {
		visible = !visible;
	};
</script>

<div class="w-2/3 border">
	<div class="flex w-full items-center justify-between px-1">
		<h6 class="tracking-wide text-gray-300">{heading}</h6>
		{#if visible}
			<button type="button" onclick={toggleVisibility}>
				<img class="h-3 w-3" src="/icons/minus.png" alt="" /></button
			>
		{:else}
			<button type="button" onclick={toggleVisibility}>
				<img class="h-3 w-3" src="/icons/plus.png" alt="" /></button
			>
		{/if}
	</div>
	<div
		style={visible ? `height: ${h}px; border-top: 1px solid white` : ''}
		class="h-0 overflow-scroll px-1 transition-all duration-300"
	>
		{@render children()}
	</div>
</div>
