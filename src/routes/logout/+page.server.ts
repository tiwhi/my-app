import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const load: PageServerLoad = async () => {
	// all we're doing here is redirecting users after hitting this endpoint for its API function so we don't need to see the page or load any data onto it
	throw redirect(302, '/');
};

// we're using a default action here, rather than a named action, which is why this looks different. we can use the default action because we only have one function on this page
export const actions: Actions = {
	default({ cookies }) {
		// delete the cookie by setting it to an empty string
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0) // this sets the expiry date to december 31, 196 which is directly before the unix epoch i think... anyway it means that the cookie has super definitely already expired
		});
		cookies.set('user', '', {
			path: '/',
			expires: new Date(0)
		});
		throw redirect(302, '/login'); // redirect user to the login page or wherever else we want to send them after deleting the cookie
	}
};
