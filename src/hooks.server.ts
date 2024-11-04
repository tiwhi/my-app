import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { connectToDB } from '$lib/pg_db';
import { isValidUser } from '$lib/auth';
import type { Pool } from 'pg';

const ONE_MONTH_IN_SECONDS = 60 * 60 * 24 * 30;

const pool: Pool = await connectToDB();

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pool = pool;
	// get the cookies for user and session from the browser
	const session = event.cookies.get('session');

	console.log('shape of session cookie = ', session);
	const cookieUser = event.cookies.get('user');

	// if there is a user cookie but no session cookie, then check if the user is valid and resset the session cookie
	if (!session && cookieUser) {
		// check if the user is valid
		const validUser = await isValidUser(cookieUser);

		if (validUser) {
			// set the token for the user session in the cookie
			event.cookies.set('session', crypto.randomUUID(), {
				// send cookie for every page
				path: '/',
				// make sure cookie is httponly so can't be accessed by javascript
				httpOnly: true,
				// only allow requests from same site to prevent csrf attacks
				sameSite: 'strict',
				// only send over HTTPS in production
				secure: process.env.NODE_ENV === 'production',
				// set cookie expiry to one month
				maxAge: ONE_MONTH_IN_SECONDS
			});
		}

		event.locals.user = {
			name: cookieUser
		};
	}

	if (session && cookieUser) {
		event.locals.user = {};
		if (cookieUser.toLowerCase() === 'tim') {
			event.locals.user = {
				name: cookieUser,
				role: 'admin'
			};
		} else {
			event.locals.user = { name: cookieUser, role: 'user' };
		}
	}

	// COME BACK TO THIS TO MAKE SURE IT IS SECURE AND WORKING HOW I WANT if there is no session, just return the page as normal
	if (!session && !cookieUser) {
		return await resolve(event);
	}

	if (session && !cookieUser && !event.url.pathname.startsWith('/login')) {
		if (event.locals.user) {
			delete event.locals.user;
		}
		console.log('session but no user cookie. redirecting to /login so you can login again.');
		throw redirect(302, '/login');
	}

	const response = await resolve(event);

	return response;
};
