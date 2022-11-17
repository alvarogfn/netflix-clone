import { defineStore } from "pinia";
import { watchmode } from "../apis/watchmode";
import { db } from "../db";

export const useAppStore = defineStore("app", {
  state: () => ({}),
  actions: {
    async getUserById(id) {
      const response = await db.user.get(id);
      return response;
    },
    async getAllGenres() {
      const response = await db.genres.toArray();
      return response;
    },

    async getAllMovies() {
      return db.movies.toArray();
    },

    async getMovieById(id) {
      const movie = await db.movies.get(+id);

      if (movie === undefined) {
        const response = await watchmode.get(`title/${id}/details`);

        const movie = response.data;

        const movieId = movie.id;

        delete movie.id;

        const addedID = await db.movies.put({
          movie_id: movieId,
          ...movie,
        });

        return await db.movies.get(addedID);
      }

      return movie;
    },

    async getMoviesByIds(ids) {
      const movies = await db.movies
        .where("movie_id")
        .anyOf(ids.map((id) => +id));

      console.log(movies);
    },

    async getMoviesByGenre(genre_id) {
      const movies = await db.movies
        .where("genres")
        .equals(+genre_id)
        .toArray();
      return movies;
    },

    async getMoviesByGenres(genres_id) {
      let movies = await Promise.all(
        genres_id.map(async (genre_id) => {
          return {
            [genre_id]: await this.getMoviesByGenre(genre_id),
          };
        })
      );

      movies = movies.reduce((acc, act) => {
        acc[Object.keys(act)[0]] = Object.values(act)[0];

        return acc;
      }, {});

      return movies;
    },

    async getAllMoviesByAllGenres() {
      const genres = await this.getAllGenres();
      const movies = await this.getMoviesByGenres(
        genres.map(({ genre_id }) => genre_id)
      );

      return movies;
    },

    async addToHistory({ user_id, movie_id }) {
      const lastWatched = await db.history
        .where("user_id")
        .equals(user_id)
        .and((item) => item.movie_id === movie_id)
        .first();

      if (lastWatched && lastWatched.history_id) {
        const response = db.history.update(lastWatched.history_id, {
          played_at: Date.now(),
        });

        return response;
      }

      const response = await db.history.add({
        user_id,
        movie_id,
        played_at: Date.now(),
      });

      return response;
    },

    async getUserHistory(user_id, limit) {
      let histories = await db.history
        .where("user_id")
        .equals(user_id)
        .limit(limit)
        .toArray();

      histories = histories.sort((a, b) => a.played_at - b.played_at);

      histories = await Promise.all(
        histories.map(async (history) => {
          return this.getMovieById(history.movie_id);
        })
      );

      return histories;
    },
  },
});
