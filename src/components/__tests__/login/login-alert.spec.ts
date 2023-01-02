import { describe, it, expect, vi, afterEach } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import HeaderLogin from "@/components/login/header-login.vue";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
  RouterLink: {},
}));

describe("should test the header-alert implementation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("test if the link router points to the right path", () => {
    const wrapper = mount(HeaderLogin, {
      global: {
        stubs: { RouterLink: RouterLinkStub },
        plugins: [createTestingPinia({ createSpy: vi.fn() })],
      },
    });

    expect(wrapper.getComponent(RouterLinkStub).props().to).toStrictEqual({
      name: "home",
    });
  });
});
