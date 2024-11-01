import pool from '$lib/pg_db';

import type { DBUser } from '$lib/interfaces/user_interfaces';
import type { DBMemo } from '$lib/interfaces/memo_interfaces';

export async function getUserById(id: string): Promise<DBUser | null> {
	const result = await pool.query<DBUser>('SELECT * FROM users WHERE id = $1', [id]);
	return result.rows[0] || null;
}

export async function getUserByUserName(username: string): Promise<DBUser | null> {
	const result = await pool.query<DBUser>('SELECT * FROM users WHERE username = $1', [username]);
	return result.rows[0] || null;
}

export async function getAllUsers(): Promise<DBUser[]> {
	const result = await pool.query<DBUser>('SELECT * FROM users');
	return result.rows || [];
}

export async function getMemosByUserId(userId: string): Promise<DBMemo[]> {
	const result = await pool.query<DBMemo>('SELECT * FROM memos WHERE user_id = $1', [userId]);
	return result.rows || [];
}

export async function getMemoById(id: string): Promise<DBMemo | null> {
	const result = await pool.query<DBMemo>('SELECT * FROM memos WHERE id = $1', [id]);
	return result.rows[0] || null;
}
