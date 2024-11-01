import pool from '$lib/pg_db';
import type { DBUser } from '$lib/interfaces/user_interfaces';
import { DBMemo } from '$lib/interfaces/memo_interfaces';

export async function deleteMemo(user: DBUser, memoId: string) {
	if (!user) {
		throw new Error(`User with ID ${user.id} not found`);
	}

	const result = await pool.query(
		`DELETE FROM memos
    WHERE id = $1 RETURNING *`,
		[memoId]
	);

	const deletedMemo: DBMemo = result.rows[0];
	const deletedMemoId = deletedMemo.id;

	return deletedMemoId;
}
