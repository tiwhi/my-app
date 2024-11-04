import { pool } from '$lib/pg_db';
import type { DBUser } from '$lib/interfaces/user_interfaces';
import type { FormDataMemo, DBMemo } from '$lib/interfaces/memo_interfaces';

// export async function getUserById(id: string): Promise<DBUser | null> {
// 	const result = await pool.query<DBUser>('SELECT * FROM users WHERE id = $1', [id]);
// 	return result.rows[0] || null;
// }

// [WHERE I LEFT OFF - 10/6/24]: CHANGE THIS FUNCTION INTO THE CREATE MEMO FUNCTION
// DONE - CREATE AN INTERFACE FOR THE MEMO IN TYPESCRIPT
// DONE - CHECK THE CURRENT USER (AND ENUSRE THEY'RE AUTHENTICATED) BEFORE ADDING MEMO BECAUSE WE'LL BE USING THE USER'S ID AND NAME TO POPULATE THE MEMO
// DONE - ADD IN THE SQL QUERY I WROTE WITH CLAUDE FOR CREATING A MEMO
// - test out this function with some dummy data (or just hook it up to the front end and see what breaks)
export async function createMemo(user: DBUser, memoData: FormDataMemo): Promise<DBMemo> {
	const memoUUID = crypto.randomUUID();

	const created_at = new Date();

	if (!user) {
		throw new Error(`User with ID ${userId} not found`);
	}

	const result = await pool.query(
		`INSERT INTO memos (
      id, user_id, author, content, created_at
    ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
		[memoUUID, user.id, user.first_name, memoData.content, created_at]
	);

	const created_memo: DBMemo = result.rows[0];
	return created_memo;
}
