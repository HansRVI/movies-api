//cuando creamos un Stub sinon les inyecta unas propiedades para ver si fueron llamados o no
// podemos probar si cuando el servicio fue ejecutado ver si llamo los métodos de la respectiva librería
const sinon = require("sinon");
// para que funcione filtrar con los tags
const { moviesMock, filteredMoviesMock } = require("./movies");

const getAllStub = sinon.stub();
// una característica de los Stubs es que cuando se llaman con ciertos argumentos podemos hacer que respondan de cierta manera
getAllStub.withArgs("movies").resolves(moviesMock);

const tagQuery = { tags: { $in: ["Drama"] } };
getAllStub.withArgs("movies", tagQuery).resolves(filteredMoviesMock("Drama"));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
	getAll(collection, query) {
		return getAllStub(collection, query);
	}
	create(collection, data) {
		return createStub(collection, data);
	}
}
module.exports = {
	getAllStub,
	createStub,
	MongoLibMock,
};
