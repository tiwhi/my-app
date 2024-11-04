import { pool } from '$lib/pg_db';
import type { DBMemo } from '$lib/interfaces/memo_interfaces';
import type { DBUser } from '$lib/interfaces/user_interfaces';

export async function updateMemo(
	user: DBUser,
	memoId: string,
	memoContent: string
): Promise<DBMemo> {
	if (!user) {
		throw new Error(`User with ID ${user.id} not found`);
	}

	const updated_at = new Date();

	const result = await pool.query(
		`UPDATE memos
    SET content = $2, updated_at = $3
    WHERE id = $1 RETURNING *`,
		[memoId, memoContent, updated_at]
	);

	const updated_memo: DBMemo = result.rows[0];
	return updated_memo;
}
