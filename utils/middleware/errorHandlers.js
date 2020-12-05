const boom = require("@hapi/joi");
const { config } = require("../../config/index");
//funcionalidad de ayuda

function withErrorStack(error, stack) {
	if (config.dev) {
		return { ...error, stack };
	}
	return error;
}

//middlewares

function logErrors(err, req, res, next) {
	console.log(err);
	next(err);
}

function wrapErrors(err, req, res, next) {
	if (!err.isBoom) {
		next(boom.badImplementation(err));
	}
	next(err);
}

function errorHandler(err, req, res, next) {
	const {
		output: { statusCode, payload },
	} = err;

	res.status(statusCode || 500);
	res.json(withErrorStack(payload, err.stack));
}

module.exports = {
	logErrors,
	wrapErrors,
	errorHandler,
};
