import HeaderSignup from "/components/signup/header-signup.vue";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useRoute } from "vue-router";
import { createTestingPinia } from "@pinia/testing";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
  RouterLink: {},
}));

describe("Deve testar se o componente signup-error renderiza corretamente", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Testa se os links vão para caminhos válidos.", () => {
    vi.mocked(useRoute, { partial: true }).mockImplementationOnce(() => ({
      path: "/",
    }));
    const wrapper = mount(HeaderSignup, {
      global: {
        stubs: { RouterLink: RouterLinkStub },
        plugins: [createTestingPinia({ createSpy: vi.fn() })],
      },
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toStrictEqual({
      name: "home",
    });
  });
});
