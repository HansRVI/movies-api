const express = require("express");
const helmet = require("helmet");
const app = express();

const { config } = require("./config/index");

const authApi = require("./routes/auth");

const moviesApi = require("./routes/movies.js");
const userMoviesApi = require("./routes/userMovies");
// middleware de errores
const {
	logErrors,
	errorHandler,
	wrapErrors,
} = require("./utils/middleware/errorHandlers.js");

const notFound = require("./utils/middleware/notFoundHandler");

// body parser middleware
app.use(express.json());

// helmet middleware
app.use(helmet());

// routes
authApi(app);
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
