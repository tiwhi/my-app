<script>
	import '../app.css';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	// registration enabled feature flag
	const registrationEnabled = false;
	let adminFlag = false;
	console.log('from layout: page.data', $page.data);
	// [TODO - 2/3/24]: NOT SECURE - CAN CHANGE IN DEVTOOLS AND COMPLETELY BREAK -> UPDATE TO USE SERVER SIDE AUTHENTICATION AND AUTHORIZATION
	// if (
	// 	$page.data.user &&
	// 	$page.data.user.hasOwnProperty('role') &&
	// 	$page.data.user.role === 'admin'
	// ) {
	// 	adminFlag = true;
	// }
</script>

<nav class="navbar bg-base-100">
	<ul class="menu menu-horizontal px-1">
		<!-- this conditional checks wether we're on the index page -> if $page.routeId is null then we're on the home route index page, otherwise we're on a different page and want a home button to display -->

		<li>
			<a href="/">Home</a>
		</li>

		{#if !$page.data.user}
			<li>
				<a href="/login">Login</a>
			</li>
			{#if registrationEnabled}
				<li>
					<a href="/register">Register</a>
				</li>
			{/if}
		{/if}

		{#if $page.data.user}
			{#if adminFlag}
				<li>
					<a href="/admin">Admin</a>
					<a href="/memos">Memos</a>
				</li>
			{/if}
			<li>
				<form
					action="/logout"
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							invalidateAll();
							await applyAction(result);
						};
					}}
				>
					<button type="submit">Log out</button>
				</form>
			</li>
		{/if}
	</ul>
</nav>

<slot />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
