const assert = require("assert");
const proxyquire = require("proxyquire");

const { moviesMock, MoviesServiceMock } = require("../utils/mocks/movies.js");
const testServer = require("../utils/testServer");

describe("routes -movies", () => {
	const route = proxyquire("../routes/movies", {
		//La inclusión de este servicio va a ser reemplazada por MoviesServiceMock, en el archivo de rutas, para hacer este test
		"../services/movies": MoviesServiceMock,
	});

	const request = testServer(route);

	describe("GET /movies", () => {
		it("Should respond with status 200", function (done) {
			// hacemos un get y esto es gracias a supertest
			request.get("/api/movies").expect(200, done);
		});

		it("Should respond with the list of movies", function (done) {
			request.get("/api/movies").end((err, res) => {
				assert.deepStrictEqual(res.body, {
					data: moviesMock,
					message: "movies listed",
				});
				done();
			});
		});
	});
});
