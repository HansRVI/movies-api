const express = require("express");

const app = express();

const { config } = require("./config/index");
const moviesApi = require("./routes/movies.js");
const userMoviesApi = require("./routes/ userMovies");
// middleware de errores
const {
	logErrors,
	errorHandler,
	wrapErrors,
} = require("./utils/middleware/errorHandlers.js");

const notFound = require("./utils/middleware/notFoundHandler");

// middleware del body parser
app.use(express.json());

// routes
moviesApi(app);
userMoviesApi(app);
// Catch 404
app.use(notFound);

// middleware de errores, siempre tienen que ir al final de las rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
	console.log(`Listening http://localhost:${config.port}`);
});
