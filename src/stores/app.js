import { defineStore } from "pinia";
import { db } from "../db";

export const useAppStore = defineStore("app", {
  state: () => ({}),
  actions: {
    async getUserById(id) {
      const response = await db.user.get(id);
      return response;
    },
  },
});
