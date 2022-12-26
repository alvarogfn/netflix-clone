export function focusAllFormInputs(el: HTMLFormElement) {
  for (const element of el.elements) {
    const input = element as HTMLInputElement;
    setTimeout(() => input.focus(), 100);
    setTimeout(() => input.blur(), 100);
  }
}
