import Dexie from "dexie";

interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  picture: Blob;
  preferences: Map<string, number>;
}

interface History {
  id?: number;
  user_id: number;
  movie_id: number;
  played_at: number;
}

export interface Movie {
  id?: number;
  title: string;
  year: number | null;
  plot: string;
  genres: number[];
  genre_names: string[];
  backdrop: string;
  video: string;
  rating: string | null;
  views: number;
}

export interface Genre {
  id?: number;
  name: string;
}
/**
 * Creation of class to define dexie database typing.
 */
export class AppDatabase extends Dexie {
  public users!: Dexie.Table<User, number>;
  public history!: Dexie.Table<History, number>;
  public movies!: Dexie.Table<Movie, number>;
  public genres!: Dexie.Table<Genre, number>;

  constructor() {
    super("app");

    this.version(1).stores({
      users: "++id,&email,password",
      history: "++id,user_id,movie_id,played_at",
      movies: "++id,title,*genres,*genres_name",
      genres: "++id,name",
    });
  }
}

export const db = new AppDatabase();
