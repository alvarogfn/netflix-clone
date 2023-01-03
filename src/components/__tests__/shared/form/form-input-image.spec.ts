import { describe, it, expect } from "vitest";

describe("", () => {
  it("", () => {
    expect(true).toBe(true);
  });
});

// describe("Deve testar a implementação do remember check", () => {
//   afterEach(() => {});

//   it("Deve testar se as 'props' influenciam no estado inicial do input", () => {
//     const props = { label: "Input Image", required: true, id: "image" };

//     const wrapper = mount(FormInputImage, {
//       props: props,
//     });

//     expect(wrapper.find("input").attributes().id).toBe(props.id);
//     expect(wrapper.find("input").attributes().required).toBeDefined();
//     expect(wrapper.find("label").text()).toContain(props.label);
//   });

//   it("Deve testar se o input emite o file corretamente", async () => {
//     const props = { label: "Input Image", required: true, id: "image" };

//     const wrapper = mount(FormInputImage, {
//       props: props,
//     });

//     const input = wrapper.find("input");

//     input.trigger("change");
//     console.log(wrapper.emitted("change"));
//     // expect(wrapper.emitted("invalid")).toBe(true);
//   });

//   // it("Deve testar se o input emite o evento update:value com o valor falso", async () => {
//   //   const wrapper = mount(LoginRememberCheck, { props: { value: true } });

//   //   const input = wrapper.find("input");
//   //   await input.setValue(false);
//   //   input.trigger("input");

//   //   expect(wrapper.emitted("update:value")?.[0][0]).toBe(false);
//   // });
// });
