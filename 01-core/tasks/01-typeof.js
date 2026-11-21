// Задача 1. typeof-детектив
//
// Впишите в массив predictions строки, которые вернёт оператор typeof
// для каждого значения из массива values (в том же порядке).
// Пример: для 42 typeof вернёт 'number'.
//
// Подсказка: у JS есть историческая особенность с null — проверьте сами.
//
// Запуск: node 01-core/tasks/01-typeof.js

import { check, summary } from "./_check.js";

const values = [
  undefined,
  null,
  true,
  42,
  3.14,
  "hello",
  Symbol("id"),
  10n,
  [],
  {},
  function () {},
  NaN,
];

const predictions = [
  /* #1  */ "undefined",
  /* #2  */ "object",
  /* #3  */ "boolean",
  /* #4  */ "number",
  /* #5  */ "number",
  /* #6  */ "string",
  /* #7  */ "symbol",
  /* #8  */ "bigint",
  /* #9  */ "object",
  /* #10 */ "object",
  /* #11 */ "function",
  /* #12 */ "number",
];

function describe(value) {
  if (typeof value === "symbol") return value.toString();
  if (typeof value === "function") return "function () {}";
  if (typeof value === "bigint") return `${value}n`;
  if (typeof value === "string") return `'${value}'`;
  if (Array.isArray(value)) return "[]";
  if (value !== null && typeof value === "object") return "{}";
  return String(value);
}

console.log("\n1. typeof — впишите предсказания в массив predictions\n");

values.forEach((value, index) => {
  check(
    `#${index + 1} typeof ${describe(value)}`,
    typeof value,
    predictions[index],
  );
});

summary();
