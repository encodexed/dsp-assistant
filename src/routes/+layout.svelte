<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="flex h-full w-full flex-col items-center gap-2 text-sm text-stone-100">
	{@render children()}
</main>
