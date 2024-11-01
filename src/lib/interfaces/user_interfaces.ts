export interface DBUser {
	id: string;
	is_active: boolean;
	is_verified: boolean;
	last_login: Date | null;
	created_at: Date;
	updated_at: Date;
	username: string;
	email: string | null;
	password_hash: string;
	first_name: string | null;
	last_name: string | null;
}

export interface FormDataUser {
	is_active: boolean;
	is_verified: boolean;
	last_login: Date | null;
	created_at: Date;
	updated_at: Date;
	username: string;
	email: string | null;
	raw_password: string;
	first_name: string | null;
	last_name: string | null;
}
