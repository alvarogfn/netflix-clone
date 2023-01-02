import { describe, it, expect, vi, afterEach } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ProfileCardLink from "@/components/profile/profile-card-link.vue";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
  RouterLink: {},
}));

describe("should test the profile-link-card implementation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("test if the link router points to the right path", () => {
    const wrapper = mount(ProfileCardLink, {
      props: {
        name: "string",
        picture: "string",
        id: 1,
      },
      global: {
        stubs: { RouterLink: RouterLinkStub },
        plugins: [createTestingPinia({ createSpy: vi.fn() })],
      },
    });

    expect(wrapper.getComponent(RouterLinkStub).props().to).toStrictEqual({
      name: "profile",
    });
  });
});
