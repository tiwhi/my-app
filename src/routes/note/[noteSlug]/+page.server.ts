import { getMemoById } from '$lib/utils/dbReadOperations';
import { updateMemo } from '$lib/utils/updateMemoInDb';
import { deleteMemo } from '$lib/utils/deleteMemoInDb';
import { getUserByUserName } from '$lib/utils/dbReadOperations';
import type { DBUser } from '$lib/interfaces/user_interfaces';

export async function load({ locals, params }) {
	const memo = await getMemoById(params.noteSlug).then((result) => result);

	console.log('123 memo is ', memo);

	// memoPromise.then((result: DBMemo | null) => {
	// 	console.log('123 result is ', result);
	// 	return { memo: result };
	// 	console.log('hjk if we got here we have passed returning the result');
	// });
	return { memo: memo };
}

export const actions = {
	update_memo: async (event) => {
		// first get the verified user so we can get their memos by their user id
		// let user = event.locals.user.name;
		let user = { name: 'tim', role: 'admin', id: 'a9a5ba4c-9f8f-4b85-aa87-538d0f53e4e6' };

		const verified_user = await getUserByUserName(user.name);

		// update this to redirect back to login page and delete cookies if it fails because that means the user is not authenticated and shouldn't be able to access anything without first logging in
		if (!verified_user) {
			throw new Error('could not find user by username in db');
		}

		user = verified_user as DBUser;

		console.log('123 user is ', user);
		const data = await event.request.formData();
		console.log('123 data is ', data);
		const memoContent = data.get('content') as string | null;
		if (memoContent === null) {
			throw new Error('no memo content found');
		}

		const memoID = event.params.noteSlug;
		const updatedMemo = await updateMemo(user, memoID, memoContent);
		console.log('123 updatedMemo is ', updatedMemo);

		return { updatedMemo: updatedMemo };
	},
	delete_memo: async (event) => {
		const memoId = event.params.noteSlug;
		console.log('123 memoId is: ', memoId);

		let user = { name: 'tim', role: 'admin', id: 'a9a5ba4c-9f8f-4b85-aa87-538d0f53e4e6' };

		const verified_user = await getUserByUserName(user.name);
		// update this to redirect back to login page and delete cookies if it fails because that means the user is not authenticated and shouldn't be able to access anything without first logging in
		if (!verified_user) {
			throw new Error('could not find user by username in db');
		}
		user = verified_user as DBUser;

		const deletedMemoID = await deleteMemo(user, memoId);
		console.log('123 deletedMemoID is ', deletedMemoID);
		return { deletedMemoID: deletedMemoID };
	}
};
