<script lang="ts">
	let { src, onclick, isSelected }: { src: string; onclick: () => void; isSelected: boolean } =
		$props();
</script>

<button
	class:bg-teal-300={isSelected}
	class:border-2={isSelected}
	class:hover:bg-teal-400={isSelected}
	class="rounded-md border border-teal-600 border-b-teal-700 border-t-teal-500 bg-teal-900 p-2 transition-colors hover:bg-[#114642]"
	{onclick}><img {src} class="size-8" alt="" /></button
>
