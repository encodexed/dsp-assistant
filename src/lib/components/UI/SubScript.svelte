<script lang="ts">
	let { children, color } = $props();
</script>

<p class={`select-none ${color}`}>
	{@render children()}
</p>

<style>
	.teal {
		color: rgb(34, 211, 288);
		filter: drop-shadow(0 0px 1px rgba(34, 211, 288, 1));
	}

	.orange {
		color: rgb(251, 191, 36);
		filter: drop-shadow(0 0px 1px rgba(251, 191, 36, 1));
	}
</style>
