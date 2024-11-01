export interface FormDataMemo {
	content: string;
}

export interface DBMemo {
	id: string;
	user_id: string;
	created_at: Date;
	updated_at: Date;
	author: string;
	content: string;
}
