const MongoLib = require("../lib/mongo");

class UserMoviesService {
	constructor() {
		this.collection = "user-movies";
		this.mongoDB = new MongoLib();
	}

	async getUserMovies({ userId }) {
		console.log(userId);
		const query = userId && { userId };
		console.log(query);
		const userMovies = await this.mongoDB.getAll(this.collection, query);

		return userMovies || [];
	}

	async createUserMovie({ userMovie }) {
		const createdUserMovieId = await this.mongoDB.create(
			this.collection,
			userMovie,
		);

		return createdUserMovieId;
	}

	async deleteUserMovie({ userMovieId }) {
		const deletedUserMovieId = await this.mongoDB.delete(
			this.collection,
			userMovieId,
		);

		return deletedUserMovieId;
	}
}

module.exports = UserMoviesService;
