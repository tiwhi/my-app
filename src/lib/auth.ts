import bcrypt from 'bcrypt';
import { getUserByUserName } from '$lib/utils/dbReadOperations';
import type { DBUser } from '$lib/interfaces/user_interfaces';

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hash: string) {
	return await bcrypt.compare(password, hash);
}

export async function isValidUser(username: string): Promise<boolean> {
	// get user by username
	const user: DBUser | null = await getUserByUserName(username);
	// throw redirect if user is null because that means no user in db
	if (user == null) {
		return false;
	} else {
		return true;
	}
}
