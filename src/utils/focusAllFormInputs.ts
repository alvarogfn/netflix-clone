import { timeout } from "./timeout";

export async function focusAllFormInputs(el: HTMLFormElement) {
  for (const element of el.elements) {
    const input = element as HTMLInputElement;
    await timeout(() => input.focus(), 100);
    await timeout(() => input.blur(), 100);
  }
}
