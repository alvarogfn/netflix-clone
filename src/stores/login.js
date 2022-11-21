import { defineStore } from "pinia";
import { db } from "../db";

export const useLoginStore = defineStore("login", {
  state: () => ({
    email: undefined,
    picture: undefined,
    name: undefined,
    id: undefined,
    history: [],
  }),
  getters: {
    islogged() {
      return !!this.id;
    },
    pictureHref() {
      const href = URL.createObjectURL(this.picture);
      return href;
    },
  },
  actions: {
    async login(email, password) {
      const response = await db.users
        .where("email")
        .equalsIgnoreCase(email)
        .and((item) => item.password === password)
        .first();

      if (response === undefined) throw new Error("User not found");

      this.id = response.user_id;
      this.email = response.email;
      this.picture = response.picture;
      this.name = response.name;

      return this.islogged;
    },

    async signup(email, password, name, picture) {
      const id = await db.users.add({
        email,
        password,
        name,
        picture,
        pictureHref: URL.createObjectURL(picture),
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
