import { db, type Genre } from "@/database/database";

export async function getAllGenresByUserRelevance(user_id: number) {
  const genres = await db.genres.toArray();

  const user = await db.users.get(user_id);
  if (user === undefined) throw new Error();

  if (!user.preferences) return genres;
  if (user.preferences.size === 0) return genres;

  const entries = Array.from(user.preferences.entries());
  entries.sort((a, b) => a[1] - b[1]).reverse();

  const genresByPriority: Genre[] = [];

  entries.forEach(([genre_id]) => {
    const genre = genres.filter((genre) => genre.id! === genre_id)[0];
    genresByPriority.push(genre);
  });

  genresByPriority.push(
    ...genres.filter((genre) => {
      return !genresByPriority.some(
        (genreByPriority) => genreByPriority.id! === genre.id!
      );
    })
  );

  return genresByPriority;
}
