import { db } from "@/database/database";

export async function addNewUserView(user_id: number, movie_id: number) {
  const alreadyWatched = await db.history
    .where("user_id")
    .equals(user_id)
    .and((item) => item.movie_id === movie_id)
    .first();

  if (alreadyWatched && alreadyWatched.id) {
    const response = db.history.update(alreadyWatched.id, {
      played_at: Date.now(),
    });

    return response;
  }

  await db.history.add({ user_id, movie_id, played_at: Date.now() });
  await addNewUserPreference(user_id, movie_id);
  await addNewMovieView(movie_id);
  await addNewGenresView(movie_id);
}

async function addNewUserPreference(user_id: number, movie_id: number) {
  const movie = await db.movies.where("id").equals(movie_id).first();
  if (movie === undefined) throw new Error("Movie Not Found");

  const user = await db.users.where("id").equals(user_id).first();
  if (user === undefined) throw new Error("User Not Found");

  const preferences = user.preferences;
  const newPreferences = new Map(preferences);

  movie.genres.forEach((genre) => {
    const preferency = preferences.get(genre) ?? 0;
    newPreferences.set(genre, preferency + 1);
  });

  db.users.update(user_id, { preferences: newPreferences });
}

async function addNewMovieView(movie_id: number) {
  const views = await db.history.where("movie_id").equals(movie_id).count();
  return await db.movies.update(movie_id, { views });
}

async function addNewGenresView(movie_id: number) {
  const movie = await db.movies.where("id").equals(movie_id).first();

  if (movie === undefined)
    throw new Error("Cannot add Genres View, movie is undefined");

  return Promise.all(
    movie.genres.map(async (id) => {
      const genre = await db.genres.get(id);
      if (genre === undefined) return;

      const views = genre.views ?? 0;
      return db.genres.update(id, { views: views + 1 });
    })
  );
}

export async function topUsersMetrics() {
  const users = await db.users.toArray();

  const data = await Promise.all(
    users.map(async (user) => {
      const views = await db.history.where("user_id").equals(user.id!).count();
      return { user, views };
    })
  );

  return data;
}
