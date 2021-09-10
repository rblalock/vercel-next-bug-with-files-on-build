import Database from 'better-sqlite3';
import path from 'path';

let db;

try {
	const dir = path.resolve(process.cwd(), 'data', 'vercel_test');
	db = new Database(dir, {
		readonly: true,
		fileMustExist: true,
	});
} catch (err) {
	log.error(err);
	log.error('In path: ', dir);
}

const sampleQuery = () => {
	try {
		const results = db.prepare('SELECT * FROM sample').all();
		return results;
	} catch (err) {
		return err;
	}
};

export default async (req, res) => {
	try {
		const data = sampleQuery();
		console.log(data);
		return res.status(200).json({
			success: true,
			data,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};
