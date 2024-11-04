<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-lg">
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<div class="card-body mx-10">
					<h1 class="text-5xl font-bold pb-5">Login</h1>
					<div class="form-control">
						<form method="POST">
							<div class="form-control">
								<label class="label" for="username">
									<span class="label-text"> Username </span>
								</label>

								<input
									id="username"
									class="input input-bordered"
									name="username"
									type="text"
									required
								/>
							</div>
							<div class="form-control">
								<div class="form-control">
									<label class="label" for="password">
										<span class="label-text">Password</span>
									</label>
									<input
										id="password"
										class="input input-bordered"
										name="password"
										type="password"
										required
									/>
								</div>
								<!-- handle displaying errors if a form input is missing -->
								{#if form?.invalid}
									<p class="error">Username and password are required.</p>
								{/if}

								<!-- handle displaying errors if a form input is incorrect (wrong username or password) -->
								{#if form?.credentials}
									<p class="error">You have entered an incorrect username or password.</p>
								{/if}
								<div class="form-control mt-6">
									<button type="submit" class="btn btn-primary">Login</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
