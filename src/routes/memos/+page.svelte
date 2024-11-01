<script lang="ts">
	import NotesGrid from '$lib/components/NotesGrid.svelte';

	export let data;
	console.log('data from /memos: ', data);
	const memos = data.memos;
</script>

<main>
	<NotesGrid {memos} />
</main>
