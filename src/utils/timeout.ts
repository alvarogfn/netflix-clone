export function timeout(
  callback: (...args: any) => unknown | any | void,
  ms: number = 0
) {
  return new Promise<ReturnType<typeof callback>>((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, ms);
  });
}
