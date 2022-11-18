import Dexie from "dexie";

export const db = new Dexie("app");

db.version("1").stores({
  users: "++user_id,&email,password",
  history: "++history_id,user_id,movie_id,played_at",
  movies: "++movie_id,title,*genres,*genres_name",
  genres: "++genre_id,name",
});
