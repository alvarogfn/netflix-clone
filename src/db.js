import Dexie from "dexie";

export const db = new Dexie("app");

db.version("2").stores({
  users: "++user_id,&email,password",
  history: "++history_id,user_id,movie_id",
  movies: "++movie_id,title,*genre_names,*genres",
  genres: "++genre_id,name",
});
