import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import type { DBUser } from '$lib/interfaces/user_interfaces';

import type { DBMemo, FormDataMemo } from '$lib/interfaces/memo_interfaces';

import { getUserByUserName, getMemosByUserId } from '$lib/utils/dbReadOperations';

import { createMemo } from '$lib/utils/createMemoInDb';

// TODO: write a load function to get all user memos from DB
// handle page loading data later
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}
	const user: DBUser | null = await getUserByUserName(locals.user.name, locals.pool);

	// const user = { name: 'tim', role: 'admin', id: 'a9a5ba4c-9f8f-4b85-aa87-538d0f53e4e6' };

	// redirect if user not logged in
	// if (!locals.user) {
	// 	throw redirect(302, '/');
	// }

	// get user by username
	// const user: DBUser | null = await getUserByUserName(locals.user.name);
	// // throw redirect if user is null because that means no user in db
	// if (user == null) {
	// 	throw redirect(302, '/');
	// }
	const userMemos: DBMemo | null = await getMemosByUserId(user.id);

	console.log('abc userMemos are: ', userMemos);
	console.log('inside load function, locals = ', locals);

	return { memos: userMemos };
};
// TODO: write crud server actions to handle crud functions for creating updating and deleteing memos
export const actions = {
	create_memo: async (event) => {
		console.log('inside create_memo, event is: ', event);

		// first get the verified user so we can get their memos by their user id
		let locals_user = event.locals.user;
		// let user = { name: 'tim', role: 'admin', id: 'a9a5ba4c-9f8f-4b85-aa87-538d0f53e4e6' };
		const user: DBUser | null = await getUserByUserName(locals_user.name);

		// const verified_user = await getUserByUserName(user.name);
		// update this to redirect back to login page and delete cookies if it fails because that means the user is not authenticated and shouldn't be able to access anything without first logging in
		if (!user) {
			throw new Error('could not find user by username in db');
		}
		// user = verified_user as DBUser;
		// console.log('xyz user is: ', user);

		// get form data
		const formData = await event.request.formData();

		// create a new memo
		const memoData: FormDataMemo = { content: '' };

		// create memo with user id
		const newMemo = await createMemo(user, memoData);

		console.log('123 newMemo is: ', newMemo);

		// get the memo id out of the created memo so we can redirect there
		throw redirect(302, `${event.url.origin}/note/${newMemo.id}`);
	}
};
