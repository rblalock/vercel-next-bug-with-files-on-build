import { sampleQuery } from '../../data/db'

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
