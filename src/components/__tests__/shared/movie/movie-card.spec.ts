import { describe, it, vi, beforeEach, afterEach } from "vitest";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
  RouterLink: {},
}));

describe("should test movie-card implementation", () => {
  const movie = {
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

  beforeEach(() => {
    const app = document.createElement("div");
    app.id = "app";
    document.body.appendChild(app);

    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.outerHTML = "";
    vi.restoreAllMocks();
  });

  it("Deve testar se o card expande quando mouseenter é acionado", async () => {
    // vi.mocked(useRoute, { partial: true }).mockImplementationOnce(() => ({
    //   path: "/",
    // }));
    // const wrapper = mount(MovieCard, {
    //   props: {
    //     movie,
    //   },
    //   global: {
    //     stubs: { RouterLink: RouterLinkStub, MovieExpandedCard: true },
    //   },
    // });
    // await wrapper.find(".card").trigger("mouseenter");
    // vi.runAllTimers();
    // expect(wrapper.findComponent(MovieExpandedCard).isVisible()).toBe(true);
  });
});
