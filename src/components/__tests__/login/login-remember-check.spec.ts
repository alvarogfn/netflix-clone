import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import LoginRememberCheck from "@/components/login/login-remember-check.vue";

describe("Deve testar a implementação do remember check", () => {
  afterEach(() => {});

  it("Deve testar se as 'props' influenciam no estado inicial do input", () => {
    const wrapperFalse = mount(LoginRememberCheck, { props: { value: false } });
    const wrapperTrue = mount(LoginRememberCheck, { props: { value: true } });

    expect(wrapperFalse.find("input").element.checked).toBe(false);
    expect(wrapperTrue.find("input").element.checked).toBe(true);
  });

  it("Deve testar se o input é verdadeiro", async () => {
    const wrapper = mount(LoginRememberCheck, { props: { value: false } });

    const input = wrapper.find("input");
    await input.setValue(true);

    expect(input.element.checked).toBe(true);
  });

  it("Deve testar se o input emite o evento update:value com o valor falso", async () => {
    const wrapper = mount(LoginRememberCheck, { props: { value: true } });

    const input = wrapper.find("input");
    await input.setValue(false);
    input.trigger("input");

    expect(wrapper.emitted("update:value")?.[0][0]).toBe(false);
  });
});
