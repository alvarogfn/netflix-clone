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

    async getMoviesByGenre(genre) {
      const movies = await db.movies
        .where("genres_name")
        .equals(genre)
        .toArray();

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
  },
});
