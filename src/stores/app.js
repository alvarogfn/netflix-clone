import { defineStore } from "pinia";
import { useLoginStore } from "./login";
import { db } from "../db";

export const useAppStore = defineStore("app", {
  state: () => ({}),
  actions: {
    async getUserById(id) {
      const response = await db.users.get(+id);
      return response;
    },

    async getAllGenresByUserRelevance() {
      const genres = await db.genres.toArray();

      const loginStore = useLoginStore();

      const user = await db.users.get(+loginStore.id);

      if (!user.preferences) return genres;
      if (user.preferences && user.preferences.size === 0) return genres;

      const genresByPriority = [];

      user.preferences.forEach((value, key) => {
        const genre = genres.filter((genre) => genre.genre_id === key)[0];
        if (genre !== undefined) genresByPriority.splice(0, value, genre);
      });

      genresByPriority.push(
        ...genres.filter((genre) => {
          return !genresByPriority.some(
            (genreByPriority) => genreByPriority.genre_id === genre.genre_id
          );
        })
      );

      return genresByPriority;
    },

    async getAllGenres() {
      const genres = await db.genres.toArray();
      return genres;
    },

    async getAllMovies() {
      return db.movies.toArray();
    },

    async getMostViewedMovies() {
      const data = await db.movies.toArray();

      data.sort((a, b) => (a.views ?? 0) - (b.views ?? 0)).reverse();

      return data;
    },

    async getMostViewedGenres() {
      const data = (await db.genres.toArray())
        .sort((a, b) => a.views - b.views)
        .reverse();

      return data;
    },

    async getMovieById(id) {
      const movie = await db.movies.get(+id);

      return movie;
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

    async addNewMovieView(movie_id) {
      const views = await db.history
        .where("movie_id")
        .anyOf(movie_id, +movie_id)
        .count();

      return await db.movies.update(+movie_id, { views });
    },

    async addNewGenresView(movie_id) {
      const movie = await db.movies
        .where("movie_id")
        .equals(+movie_id)
        .first();

      return Promise.all(
        movie.genres.map(async (genre_id) => {
          const genre = await db.genres.get(+genre_id);
          if (genre === undefined) return;
          return db.genres.update(+genre_id, { views: genre.views + 1 });
        })
      );
    },

    async addNewUserPreference(user_id, movie_id) {
      const movie = await db.movies
        .where("movie_id")
        .equals(+movie_id)
        .first();

      const user = await db.users
        .where("user_id")
        .equals(+user_id)
        .first();

      const preferences = user.preferences;

      const newPreferences = new Map(preferences);

      movie.genres.forEach((genre) => {
        const preferency = newPreferences.get(genre) ?? 0;

        newPreferences.set(genre, preferency + 1);
      });

      db.users.update(user_id, { preferences: newPreferences });
    },

    async addNewUserView({ user_id, movie_id }) {
      const alreadyWatched = await db.history
        .where("user_id")
        .equals(+user_id)
        .and((item) => +item.movie_id === +movie_id)
        .first();

      if (alreadyWatched && alreadyWatched.history_id) {
        const response = db.history.update(alreadyWatched.history_id, {
          played_at: Date.now(),
        });

        return response;
      }

      await db.history.add({ user_id, movie_id, played_at: Date.now() });

      await this.addNewUserPreference(user_id, movie_id);
      await this.addNewMovieView(movie_id);
      await this.addNewGenresView(movie_id);
    },

    async getUserHistory(user_id, limit) {
      let histories = await db.history
        .where("user_id")
        .equals(user_id)
        .limit(limit)
        .toArray();

      histories = histories.sort((a, b) => a.played_at - b.played_at).reverse();

      histories = await Promise.all(
        histories.map(async (history) => {
          return this.getMovieById(history.movie_id);
        })
      );

      return histories;
    },

    async topMovieWatchers() {
      const history = await db.history.toArray();

      const topWatchers = history.reduce((acc, { user_id }) => {
        if (acc[user_id] === undefined) acc[user_id] = 0;
        else acc[user_id] += 1;
        return acc;
      }, {});

      let users = Object.keys(topWatchers);

      users = await Promise.all(
        users.map(async (id) => await this.getUserById(id))
      );

      return users.map((user) => {
        return {
          user,
          movies: topWatchers[user.user_id],
        };
      });
    },
  },
});
