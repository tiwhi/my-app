<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// let notes = [
	// 	{ id: 1, title: 'Note 1', content: 'This is the content of note 1...' },
	// 	{ id: 2, title: 'Note 2', content: "Here's some content for note 2..." },
	// 	{ id: 3, title: 'Note 3', content: 'Note 3 has this content...' }
	// 	// Add more notes as needed
	// ];

	export let memos;
	console.log('from within notegrid, memos: ', memos);
	function createNewNote() {
		const newNote = {
			id: notes.length + 1,
			title: 'New Note',
			content: 'Start typing your new note here...'
		};
		notes = [newNote, ...notes];
		editNote(newNote.id); // go to page of new note
	}

	function editMemo(memoId) {
		goto(`/note/${memoId}`);
	}

	onMount(() => {
		// Any initialization code can go here
	});
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
	<form
		method="POST"
		action="?/create_memo"
		class="bg-white shadow-md rounded-lg p-4 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
	>
		<button class="text-4xl text-gray-400"> + </button>
	</form>

	{#each memos as memo (memo.id)}
		<a
			class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
			data-sveltekit-preload-data="hover"
			href="/note/{memo.id}"
		>
			<h3 class="text-lg font-semibold mb-2">
				{memo.content ? memo.content.split('\n')[0] : 'New Note'}
			</h3>
			<p class="text-sm text-gray-600">{memo.content.slice(0, 50)}...</p>
		</a>
	{/each}
</div>
