import { useBlobURL } from "@/composables/useBlobURL";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent } from "vue";

describe("Deve testar a implementação de useBlobUrl", () => {
  it("Deve testar se o hook useBlobUrl devolve uma url válida", async () => {
    // const regex =
    //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    const blob = new File([new Uint8Array()], "image", { type: "image/png" });

    const TestComponent = defineComponent({
      template: "<div></div>",
      setup() {
        const url = useBlobURL(blob);
        console.log(url.value);
        return { url };
      },
    });

    const wrapper = mount(TestComponent);

    await wrapper.vm.$nextTick();

    console.log(wrapper.vm.url);

    expect(wrapper.vm.url).toBe("");
  });
});
