<script lang="ts">
	import { DBMemo } from '$lib/interfaces/memo_interfaces';
	import { onMount } from 'svelte';

	export let memo: DBMemo;
	let editing = false;

	$: console.log('memo changes: ', memo);

	function saveToLocalStorage() {
		localStorage.setItem(window.location.href, memo.content);
	}

	// TODO: need to replace this with a proper load function
	function loadFromLocalStorage() {
		const savedContent = localStorage.getItem(window.location.href);
		if (savedContent) {
			memo.content = savedContent;
		}
	}

	// onMount(() => {
	// 	loadFromLocalStorage();
	// });

	function toggleEdit() {
		editing = !editing;
		if (!editing) {
			saveToLocalStorage();
		}
	}

	function handleInput(event) {
		memo.content = event.target.value;
	}
</script>

<div class="w-3/4 h-screen mx-auto flex flex-col">
	<button
		on:click={toggleEdit}
		class="mt-4 px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
	>
		{editing ? 'Preview' : 'Edit'}
	</button>
	{#if editing}
		<textarea
			bind:value={memo.content}
			on:input={handleInput}
			placeholder="Enter your notes here..."
			class="flex-grow w-full p-4 text-base font-sans leading-relaxed rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
		/>
	{:else}
		<div
			class="flex-grow w-full p-4 overflow-y-auto no-scrollbar rounded-md prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
		>
			<textarea
				class="flex-grow w-full h-full p-4 text-base font-sans leading-relaxed rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
				>{memo.content}</textarea
			>
		</div>
	{/if}
</div>

<!-- below here is the second attempt at this component -> it tries to use a pencil edit icon and impliment a switch in and out of edit mode based on clicking into or away from focus -->
<!-- <script>
	import { onMount, tick } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';

	let content = '';
	let editing = false;
	let textareaRef;

	function saveToLocalStorage() {
		localStorage.setItem(window.location.href, content);
	}

	function loadFromLocalStorage() {
		const savedContent = localStorage.getItem(window.location.href);
		if (savedContent) {
			content = savedContent;
		}
	}

	onMount(() => {
		loadFromLocalStorage();
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	});

	async function enterEditMode() {
		editing = true;
		await tick();
		textareaRef.focus();
		console.log('enterEditMode');
	}

	function exitEditMode() {
		editing = false;
		saveToLocalStorage();
		console.log('exitEditMode');
	}

	function handleOutsideClick(event) {
		if (editing && !textareaRef.contains(event.target)) {
			exitEditMode();
			console.log('handleOutsideClick');
		}
	}

	function handleInput(event) {
		content = event.target.value;
	}
</script>

<div class="w-3/4 h-screen mx-auto flex flex-col relative">
	{#if editing}
		<textarea
			bind:this={textareaRef}
			bind:value={content}
			on:input={handleInput}
			placeholder="Enter your markdown here..."
			class="flex-grow w-full p-4 text-base font-sans leading-relaxed border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
		></textarea>
	{:else}
		<div
			on:click={enterEditMode}
			class="flex-grow w-full p-4 overflow-y-auto border border-gray-300 rounded-md prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none cursor-text"
		>
			<SvelteMarkdown source={content} />
		</div>
	{/if}

	<button
		on:click={enterEditMode}
		class="absolute top-2 right-2 p-2 text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
			/>
		</svg>
	</button>
</div> -->
