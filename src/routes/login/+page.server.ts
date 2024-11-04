import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import pool from '$lib/pg_db';

import { comparePasswords } from '$lib/auth';

import type { User } from '$lib/interfaces/db_user';

// handle page loading data later
export const load: PageServerLoad = async ({ locals }) => {
	console.log('inside load function, locals = ', locals);
	// redirect if user logged in
	if (locals.user) {
		throw redirect(302, '/');
	}
};

const ONE_MONTH_IN_SECONDS = 60 * 60 * 24 * 30;
let validUser = false;
export const actions = {
	default: async ({ cookies, request }) => {
		// get the data from the form
		const data = await request.formData();
		let username = data.get('username') as string;
		// make sure that capitalization doesn't matter for usernames -> not sure if this is required or not...
		username = username.toLowerCase();
		let password = data.get('password') as string;
		password = password.toLowerCase();

		// console.log('username = ', username);
		// console.log('password = ', password);

		// handle basic validation (are the fields filled out, are the inputs of type string) if not, return a 400 invalid response
		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			console.log('basic validation failed!');
			return fail(400, { invalid: true });
		}

		// const validUser = await isValidUser(username, password);
		// console.log('inside login action, validUser = ', validUser);

		const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
		const user: User = result.rows[0];

		if (!user || !(await comparePasswords(password, user.password_hash))) {
			return {
				status: 401,
				body: { error: 'Invalid credentials' }
			};
		} else {
			validUser = true;
		}

		if (validUser === true) {
			cookies.set('session', crypto.randomUUID(), {
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
			cookies.set('user', username, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: ONE_MONTH_IN_SECONDS
			});
			// redirect the user to index page after successful login
			console.log('xyz redirecting to /');
			throw redirect(302, '/');
		} else if (validUser === false) {
			// if user is not valid, return a 401 unauthorized response
			console.log('123 hit user is not valid');
			return fail(401, { credentials: 'username or password are incorrect' });
		}
	}
};
