import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import MovieMainSection from "@/components/shared/movies/movies-main-section.vue";
import MovieCard from "@/components/shared/movies/movie-card.vue";
import type { Movie } from "@/database/database";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
  RouterLink: {},
}));

describe("Deve testar a implementação do movie main section", () => {
  const movies: Movie[] = [
    {
      id: 1,
      title: "Boruto: Naruto The Movie",
      year: 2000,
      plot: "The spirited Boruto Uzumaki, son of Seventh Hokage Naruto, is a skilled ninja who possesses the same brashness and passion his father once had. However, the constant absence of his father, who is busy with his Hokage duties, puts a damper on Boruto's fire. He ends up meeting his father's friend Sasuke, and requests to become... his apprentice!? The curtain on the story of the new generation rises!",
      genres: [3, 1, 4],
      genre_names: ["Action", "Animation", "Comedy"],
      backdrop: "https://cdn.watchmode.com/backdrops/0158257_bd_w780.jpg",
      video: "https://www.youtube.com/watch?v=4RlEbHhuHPM",
      rating: "PG-13",
      views: 0,
    },
    {
      title: "Naruto Shippūden",
      plot: "Naruto Shippuuden is the continuation of the original animated TV series Naruto.The story revolves around an older and slightly more matured Uzumaki Naruto and his quest to save his friend Uchiha Sasuke from the grips of the snake-like Shinobi, Orochimaru. After 2 and a half years Naruto finally returns to his village of Konoha, and sets about putting his ambitions to work, though it will not be easy, as He has amassed a few (more dangerous) enemies, in the likes of the shinobi organization; Akatsuki.",
      year: 2007,
      genres: [3, 39, 40],
      genre_names: ["Action & Adventure", "Animation", "Sci-Fi & Fantasy"],
      rating: "TV-14",
      backdrop: "https://cdn.watchmode.com/backdrops/0383674_bd_w780.jpg",
      video: "https://www.youtube.com/watch?v=yKELA1qBAKA",
      views: 0,
    },
  ];

  it("Deve testar se o componente é renderizado corretamente", async () => {
    const wrapper = mount(MovieMainSection, {
      props: {
        title: "Movies",
        movies,
      },
      global: {
        stubs: { "movie-card": true },
      },
    });

    expect(wrapper.findAll("li").length).toBe(2);
  });

  it("Deve testar se o componente é renderizado corretamente", async () => {
    const div = document.createElement("div");
    div.id = "app";
    document.body.appendChild(div);

    const wrapper = mount(MovieMainSection, {
      props: {
        title: "Movies",
        movies,
      },
      global: {
        stubs: { "router-link": RouterLinkStub },
      },
    });

    const movieCards = wrapper.findAllComponents(MovieCard);

    movieCards.forEach((movieCard, index) => {
      expect(movieCard.props()).toHaveProperty("movie", movies[index]);
    });
  });
});
