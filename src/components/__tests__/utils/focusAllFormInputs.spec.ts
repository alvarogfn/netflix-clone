import { focusAllFormInputs } from "@/utils/focusAllFormInputs";
import { expect, vi, it, describe } from "vitest";

describe("Deve testar a implementação da função focusAllFormInputs", () => {
  it("focusAllFormInputs deve focar e desfocar todos os elementos de entrada de formulário no formulário", async () => {
    const form = document.createElement("form");
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    form.append(input1, input2);

    const focusSpy = vi.spyOn(input1, "focus");
    const blurSpy = vi.spyOn(input1, "blur");
    const focusSpy2 = vi.spyOn(input2, "focus");
    const blurSpy2 = vi.spyOn(input2, "blur");

    await focusAllFormInputs(form);

    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(blurSpy).toHaveBeenCalledTimes(1);
    expect(focusSpy2).toHaveBeenCalledTimes(1);
    expect(blurSpy2).toHaveBeenCalledTimes(1);
  });
});
