// Задача 2. Приведение типов
//
// Ниже 12 выражений. ЗАПИШИТЕ СНАЧАЛА своё предсказание в predictions
// (не запуская файл!), затем запустите и проверьте.
//
// Для значений-примитивов пишите их как есть: "12", 12, true, null, NaN.
// Строку пишите в кавычках: "" или "[object Object]".
//
// Запуск: node 01-core/tasks/02-coercion.js

import { check, summary } from "./_check.js";

const cases = [
  ['1 + "2"', 1 + "2"],
  ['"3" * "4"', "3" * "4"],
  ['"5" - 2', "5" - 2],
  ["true + 1", true + 1],
  ["null + 1", null + 1],
  ["undefined + 1", undefined + 1],
  ["[] + []", [] + []],
  ["[] + {}", [] + {}],
  ["[] == false", [] == false],
  ["null == undefined", null == undefined],
  ["null === undefined", null === undefined],
  ["NaN === NaN", NaN === NaN],
];

const predictions = [
  /* #1  */ "12",
  /* #2  */ 12,
  /* #3  */ 3,
  /* #4  */ 2,
  /* #5  */ 1,
  /* #6  */ NaN,
  /* #7  */ "",
  /* #8  */ "[object Object]",
  /* #9  */ true,
  /* #10 */ true,
  /* #11 */ false,
  /* #12 */ false,
];

console.log("\n2. Приведение типов — сначала предсказание, потом запуск\n");

cases.forEach(([code, value], index) => {
  check(`#${index + 1} ${code}`, value, predictions[index]);
});

summary();
