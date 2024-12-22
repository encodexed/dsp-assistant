<script lang="ts">
	let { identifier, src, clickHandler } = $props();
</script>

<button type="button" onclick={() => clickHandler(identifier)} class="flex gap-0.5 p-0.5">
	<img class="h-6 w-6" {src} alt="" />
</button>
