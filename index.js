const express = require("express");

const app = express();

const { config } = require("./config/index");
const moviesApi = require("./routes/movies.js");

// middleware de errores
const {
	logErrors,
	errorHandler,
} = require("./utils/middleware/errorHandlers.js");

// middleware del body parser
app.use(express.json());

moviesApi(app);

// middleware de errores, siempre tienen que ir al final de las rutas
app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, function () {
	console.log(`Listening http://localhost:${config.port}`);
});
