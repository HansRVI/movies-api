const boom = require("@hapi/boom");

function notFoundHandler(req, res) {
	const {
		output: { statusCode, payload },
	} = boom.notFound();
	return res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;
