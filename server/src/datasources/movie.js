const { RESTDataSource } = require('apollo-datasource-rest');

class MoviesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.themoviedb.org/3/';
        this.allGenres = [];
    }

    willSendRequest(request) {
        request.params.set('api_key', this.context.api_key);
    }

    async getNowPlayingMovies() {
        await this.getGenres();
        const data = await this.get('movie/now_playing');
        let movies = [];
        if (Array.isArray(data.results)) {
            movies = data.results.map((movie) => this.movieReducer(movie));
        }

        return movies;
    }

    movieReducer(movie) {
        let genres = [];
        if (movie.genres) {
            genres = movie.genres;
        } else {
            if (movie.genre_ids.length > 0) {
                movie.genre_ids.map((genreId) =>
                    genres.push(this.getGenreById(genreId))
                );
            }
        }

        return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            genres: genres,
            overview: movie.overview,
        };
    }

    getGenreById(genreId) {
        return this.allGenres.find((genre) => genre.id === genreId);
    }

    async getGenres() {
        const response = await this.get('genre/movie/list');
        this.allGenres = response.genres;
        return this.allGenres;
    }

    async getSpecific(id) {
        const data = await this.get(`movie/${id}`);
        return this.movieReducer(data);
    }
}

module.exports = MoviesAPI;
