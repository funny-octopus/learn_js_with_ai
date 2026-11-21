// Задача 3. isAdult(age)
//
// Реализуйте функцию isAdult(age).
//
// Требования:
//   1. Возвращает true, только если age — число и age >= 18.
//   2. Строки НЕ приводим: isAdult("20") должно вернуть false.
//   3. Для любых не-чисел (null, undefined, "18", true, {}) — false.
//   4. Для NaN — тоже false.
//
// Подсказки:
//   - typeof age === 'number'
//   - Number.isNaN(age) или Number.isFinite(age)
//   - не используйте ==
//
// Запуск: node 01-core/tasks/03-is-adult.js

import { check, summary } from "./_check.js";

function isAdult(age) {
  if (typeof age === "number" && !Number.isNaN(age) && age >= 18) {
    return true;
  } else {
    return false;
  }
}

console.log("\n3. isAnult(age)\n");

check("isAdult(18) → true", isAdult(18), true);
check("isAdult(20) → true", isAdult(20), true);
check("isAdult(18.5) → true", isAdult(18.5), true);
check("isAdult(17) → false", isAdult(17), false);
check("isAdult(0) → false", isAdult(0), false);
check("isAdult(-5) → false", isAdult(-5), false);
check('isAdult("20") → false', isAdult("20"), false);
check("isAdult(true) → false", isAdult(true), false);
check("isAdult(null) → false", isAdult(null), false);
check("isAdult(undefined) → false", isAdult(undefined), false);
check("isAdult(NaN) → false", isAdult(NaN), false);
check("isAdult({}) → false", isAdult({}), false);

summary();
