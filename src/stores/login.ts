import { defineStore } from "pinia";
import { db } from "../db";

interface State {
  email: string | null;
  picture: Blob | null;
  name: string | null;
  id: number | null;
  preferences: Map<string, number>;
}

export const useLoginStore = defineStore("login", {
  state: (): State => ({
    email: null,
    picture: null,
    name: null,
    id: null,
    preferences: new Map(),
  }),
  getters: {
    isAuth(): boolean {
      return this.id !== null;
    },
  },
  actions: {
    async login(email: string, password: string) {
      const response = await db.users
        .where("email")
        .equalsIgnoreCase(email)
        .and((item) => item.password === password)
        .first();

      if (response === undefined) throw new Error("User not found");

      this.id = response.id!;
      this.email = response.email;
      this.name = response.name;
      this.picture = response.picture;
      this.preferences = response.preferences;

      return this.isAuth;
    },

    async signup(email: string, password: string, name: string, picture: Blob) {
      const id = await db.users.add({
        email,
        password,
        name,
        picture,
        preferences: new Map(),
      });

      this.id = id;

      return id;
    },

    async logout() {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      this.$reset();
      window.location.reload();
    },
  },
});
