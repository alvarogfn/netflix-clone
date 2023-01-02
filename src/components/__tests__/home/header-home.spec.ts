import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import HeaderHome from "@/components/home/header-home.vue";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
  RouterLink: {},
}));

describe("should test the header-home implementation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

it("tests that the logo does not appear in anchora if the path is different from /", () => {
    vi.mocked(useRoute, { partial: true }).mockImplementationOnce(() => ({
      path: "/",
    }));

    const wrapper = mount(HeaderHome, {
      global: {
        stubs: { RouterLink: RouterLinkStub },
        plugins: [createTestingPinia({ createSpy: vi.fn() })],
      },
    });

    expect(wrapper.find("[data-testid='toHome']").exists()).toBeFalsy();
  });

  it("tests that the logo appear in anchora if the path is different from /", () => {
    vi.mocked(useRoute, { partial: true }).mockImplementationOnce(() => ({
      path: "/login",
    }));

    const wrapper = mount(HeaderHome, {
      global: {
        stubs: { RouterLink: RouterLinkStub },
        plugins: [createTestingPinia({ createSpy: vi.fn() })],
      },
    });

    expect(wrapper.find("[data-testid='toHome']").exists()).toBeTruthy();
  });

  it("Testa se o router link de sign in aponta para o caminho certo", () => {
    vi.mocked(useRoute, { partial: true }).mockImplementationOnce(() => ({
      path: "/login",
    }));

    const wrapper = mount(HeaderHome, {
      global: {
        stubs: { RouterLink: RouterLinkStub },
        plugins: [createTestingPinia({ createSpy: vi.fn() })],
      },
    });

    expect(
      wrapper
        .find("[data-testid='toLogin'")
        .getComponent(RouterLinkStub)
        .props().to
    ).toStrictEqual({
      name: "login",
    });
  });
});
