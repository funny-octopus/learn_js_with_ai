// Задача 5. Truthy и falsy
//
// Реализуйте splitByTruthiness(array) — она возвращает объект:
//   { truthy: [...], falsy: [...] }
// Порядок элементов внутри массивов сохраняется.
//
// Дополнительно (ответьте себе, а потом проверьте):
//   почему [] и {} попадают в truthy, хотя выглядят «пустыми»?
//   почему '0' и 'false' — truthy?
//
// Запуск: node 01-core/tasks/05-truthy-falsy.js

import { check, summary } from "./_check.js";

function splitByTruthiness(array) {
  const result = { truthy: [], falsy: [] };
  for (const el of array) {
    if (el) result.truthy.push(el);
    else result.falsy.push(el);
  }
  return result;
}

const input = [
  0,
  1,
  "",
  "hi",
  null,
  undefined,
  NaN,
  false,
  true,
  [],
  {},
  -1,
  "0",
  "false",
];

console.log("\n5. Truthy и falsy\n");

check("splitByTruthiness([]) → пустые массивы", splitByTruthiness([]), {
  truthy: [],
  falsy: [],
});

check("разделение смешанного массива", splitByTruthiness(input), {
  truthy: [1, "hi", true, [], {}, -1, "0", "false"],
  falsy: [0, "", null, undefined, NaN, false],
});

check('строки "0" и "false" — truthy', splitByTruthiness(["0", "false"]), {
  truthy: ["0", "false"],
  falsy: [],
});

check("исходный массив не изменяется", input.length, 14);

summary();
