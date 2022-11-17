import axios from "axios";
import keys from "./keys.json";

export const watchmode = axios.create({
  baseURL: "https://www.omdbapi.com/",
  params: {
    apiKey: keys.watchmode,
  },
});
