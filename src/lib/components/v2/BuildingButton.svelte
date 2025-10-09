<script lang="ts">
	let { src }: { src: string } = $props();
</script>

<!-- TODO: Add active state -->
<button
	class="rounded-md border border-teal-600 border-b-teal-700 border-t-teal-500 bg-teal-900 p-2 transition-colors hover:bg-[#114642]"
	><img {src} class="size-8" alt="" /></button
>
