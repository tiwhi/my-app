import pg from 'pg';

const { Pool } = pg;
const connectionString = import.meta.env.VITE_PG_CONNECTION_STRING;
console.log('xyz connectionString: ', connectionString);

const pool = new Pool({
	connectionString,
	ssl: {
		rejectUnauthorized: false // Use this only for development/testing
	}
});

export default pool;
