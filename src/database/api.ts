import { db } from "./database";

const compose =
  (...functions: Function[]) =>
  (ini: any) =>
    functions.reduceRight((value, func) => func(value), ini);
