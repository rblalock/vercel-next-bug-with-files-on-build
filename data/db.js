import Database from 'better-sqlite3';
import path from 'path';

let db;
const dir = path.resolve(process.cwd(), 'data', 'vercel_test');

try {
	db = new Database(dir, {
		readonly: true,
		fileMustExist: true,
	});
} catch (err) {
	console.error(err);
	console.error('In path: ', dir);
}

export const sampleQuery = () => {
	try {
		const results = db.prepare('SELECT * FROM sample').all();
		return results;
	} catch (err) {
		return err;
	}
};