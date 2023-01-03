import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ListHorizontal from "@/components/shared/list/list-horizontal.vue";

describe("Deve testar a implementação do componente list-horizontal", () => {
  it("Deve testar se o título é renderizado", () => {
    const wrapper = mount(ListHorizontal, { props: { title: "Lista" } });
    expect(wrapper.text()).toContain("Lista");
  });

  it("Deve testar se os slots são renderizados", () => {
    const wrapper = mount(ListHorizontal, {
      props: { title: "Lista" },
      slots: { default: `<li>oi</li>` },
    });
    expect(wrapper.text()).toContain("oi");
  });
});
