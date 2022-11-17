import axios from "axios";
import keys from "./keys.json";

export const watchmode = axios.create({
  baseURL: "https://api.watchmode.com/v1",
  params: {
    apiKey: keys.watchmode,
  },
});
