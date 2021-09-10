const http = require('https');
const path = require('path');
const fs = require('fs');
var AdmZip = require('adm-zip');

const pathToDb = path.join(process.cwd(), `./data/regulations.zip`);
let dbProcessDone = false;

const unzipDb = (filePath, extractPath) => {
	const zip = new AdmZip(filePath);
	const zipEntries = zip.getEntries();

	if (zipEntries && zipEntries.length > 0) {
		console.log('Extracting Contents');
		zipEntries.forEach((zipEntry) => {
			console.log(zipEntry.entryName);
		});
		const newPath = path.join(process.cwd(), extractPath ? extractPath : `./data/`);
		console.log(`Extract to: ${newPath}`);
		zip.extractAllTo(newPath, true);
	}
};

const downloadDb = async () => {
	const url = 'https://fishrules-ads.s3.us-east-1.amazonaws.com/vercel_test.zip';
	const file = fs.createWriteStream(pathToDb, { flags: 'w' });
	console.log(`writing to ${file.path}`);

	return http.get(url, (response) => {
		response.pipe(file);

		file.on('pipe', (data) => {
			console.log(data);
		});

		file.on('finish', () => {
			file.close();
			console.log(`Database downloaded`);

			// Unzip the db file
			unzipDb(pathToDb);

			// Save metadata about db
			fs.writeFileSync(
				path.join(process.cwd(), `./data/db.json`),
				JSON.stringify({
					dbVersion: '1.0.0',
					foo: 'bar'
				})
			);

			dbProcessDone = true;
		});
	}).on('error', (err) => {
		console.error(err);
		console.error(dest);
		fs.unlink(dest);
		throw new Erorr(err);
	});
};

downloadDb();

setInterval(() => {
	if (dbProcessDone) {
		process.exit();
	}
}, 1000);
