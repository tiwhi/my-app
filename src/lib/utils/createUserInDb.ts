import { pool } from '$lib/pg_db';
import { hashPassword } from '$lib/auth';
import { FormDataUser, DBUser } from '$lib/interfaces/user_interfaces';

export async function getUserById(id: string): Promise<DBUser | null> {
	const result = await pool.query<DBUser>('SELECT * FROM users WHERE id = $1', [id]);
	return result.rows[0] || null;
}

export async function createUser(user: Omit<FormDataUser, 'id'>): Promise<DBUser> {
	const hashed_password = await hashPassword(user.raw_password);
	const id = crypto.randomUUID().toString();

	const db_user: DBUser = { ...user, id, password_hash: hashed_password };

	db_user.username = db_user.username.toLowerCase(); // hack to make sure the
	if (db_user.email) {
		db_user.email = db_user.email.toLowerCase();
	}
	if (db_user.first_name) {
		db_user.first_name = db_user.first_name.toLowerCase();
	}
	if (db_user.last_name) {
		db_user.last_name = db_user.last_name.toLowerCase();
	}

	const result = await pool.query<DBUser>(
		`INSERT INTO users (
      id, is_active, is_verified, username, email, password_hash, 
      first_name, last_name, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
		[
			db_user.id,
			db_user.is_active,
			db_user.is_verified,
			db_user.username,
			db_user.email,
			db_user.password_hash,
			db_user.first_name,
			db_user.last_name,
			db_user.created_at,
			db_user.updated_at
		]
	);

	const created_user: DBUser = result.rows[0];
	return created_user;
}
