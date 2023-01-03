import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import MovieExpandedCard from "@/components/shared/movies/movie-expanded-card.vue";
import type { Movie } from "@/database/database";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
  RouterLink: {},
}));

describe("deve testar a implementação do Movie Expanded Card", () => {
  const movie: Movie = {
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
  };

  it("Deve testar se o componente redireciona para o filme certo.", async () => {
    const wrapper = mount(MovieExpandedCard, {
      props: {
        movie,
      },
      global: {
        stubs: { RouterLink: RouterLinkStub, "youtube-iframe": true },
      },
    });

    expect(wrapper.getComponent(RouterLinkStub).props().to).toStrictEqual({
      name: "watch",
      params: { id: movie.id },
    });
  });
});
