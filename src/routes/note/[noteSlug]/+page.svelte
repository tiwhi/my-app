<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data: PageData;
	console.log('abc from notes page page data is ', data);
	export let form;

	function saveToLocalStorage(data) {
		localStorage.setItem(window.location.href, data ? data.updatedMemo.content : '');
	}
</script>

<main>
	<div class="w-3/4 h-screen mx-auto flex flex-col">
		<div class="flex justify-between gap-2 pb-4">
			<a href="/memos" data-sveltekit-preload-data="hover" class="btn">Back</a>
			<form
				method="POST"
				use:enhance={() => {
					return async ({ result, update }) => {
						console.log('result: ', result);
						if (result.type === 'success') {
							goto('/memos');
						}
					};
				}}
				action="?/delete_memo"
			>
				<button type="submit" class="btn bg-red-500">Delete</button>
			</form>
		</div>
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						saveToLocalStorage(result.data);
					}
					// console.log('result: ', result);
					// console.log('update: ', update);
				};
			}}
			action="?/update_memo"
			class="flex flex-col w-full h-full"
		>
			<button type="submit" class="btn text-center px-2 mb-2">Save</button>

			<textarea name="content" value={data.memo.content} class="border-2 w-full h-full p-2" />
			<button type="submit" class="btn text-center px-2 mt-2">Save</button>
		</form>
	</div>
</main>
