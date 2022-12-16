import Dexie from "dexie";

export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  picture: Blob;
  preferences: Map<number, number>;
}

export interface History {
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
  views: number;
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

    this.version(2).stores({
      users: "++id,&email,password",
      history: "++id,user_id,movie_id,played_at",
      movies: "++id,title,*genres,*genres_name,views",
      genres: "++id,name,views",
    });
  }
}

export const db = new AppDatabase();
