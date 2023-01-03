import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FormInput from "@/components/shared/form/form-input.vue";
import type { PatternType } from "@/utils/Patterns";

describe("Deve testar a Implementação do Form Input", () => {
  const props = {
    label: "Input",
    required: true,
    id: "input",
    type: "text",
    value: "",
    placeholder: "input",
    patterns: [
      {
        type: "length",
        maxLength: 10,
        minLength: 5,
        message: "Isso é uma mensagem",
      },
    ] as PatternType[],
  };

  it("Deve testar se as 'props' influenciam no estado inicial do input", () => {
    const wrapper = mount(FormInput, {
      props: props,
    });

    const input = wrapper.find("input");

    expect(input.attributes().id).toBe(props.id);
    expect(input.element.placeholder).toBe(props.placeholder);
    expect(input.element.value).toBe(props.value);
    expect(input.element.type).toBe(props.type);
    expect(input.element.required).toBeDefined();
  });

  it("Deve testar se o input emite o valor passado", async () => {
    const wrapper = mount(FormInput, {
      props: props,
    });

    const input = wrapper.find("input");

    await input.setValue("value");

    input.trigger("input");

    expect(wrapper.emitted("update:value")?.[0][0]).toBe("value");
  });

  it("Deve testar se o input exibe a mensagem de erro corretamente", async () => {
    const wrapper = mount(FormInput, {
      props: props,
    });
    const input = wrapper.find("input");
    await input.setValue("1234");
    await input.trigger("focus");
    await input.trigger("blur");

    expect(wrapper.find("p").text()).toContain(props.patterns[0].message);

    await input.setValue("12345");
    expect(wrapper.find("p").exists()).toBeFalsy();
  });

  it("Deve testar se o input emite um válido igual a true quando o input é válido", async () => {
    const wrapper = mount(FormInput, {
      props: props,
    });

    const input = wrapper.find("input");

    await input.setValue("123456");

    input.trigger("input");

    expect(wrapper.emitted("valid")?.[0][0]).toBe(true);
  });
});
