// Задача 6. Область видимости: let, const, var
//
// Ниже 12 случаев. Впишите в predictions результат каждого случая,
// НЕ ЗАПУСКАЯ файл.
//
// Значения могут быть числами, строками, массивами и строками-названиями ошибок
// ('TypeError', 'ReferenceError').
//
// Запуск: node 01-core/tasks/06-scope.js

import { check, summary } from "./_check.js";

const cases = [
  [
    "var видна за блоком",
    () => {
      if (true) {
        var a = 1;
      }
      return a;
    },
  ],
  [
    "let не видна за блоком",
    () => {
      if (true) {
        let b = 1;
      }
      return typeof b;
    },
  ],
  [
    "переменная функции не видна снаружи",
    () => {
      function f() {
        var inner = 5;
      }
      f();
      return typeof inner;
    },
  ],
  [
    "var до объявления",
    () => {
      return typeof v;
      var v = 1;
    },
  ],
  [
    "let до объявления (TDZ)",
    () => {
      try {
        return later;
      } catch (e) {
        return e.name;
      }
      let later = 1;
    },
  ],
  [
    "внутренняя переменная затеняет внешнюю",
    () => {
      let x = 1;
      {
        let x = 2;
      }
      return x;
    },
  ],
  [
    "var в блоке перезаписывает внешнюю",
    () => {
      var y = 1;
      {
        var y = 2;
      }
      return y;
    },
  ],
  [
    "повторное объявление через var",
    () => {
      var d = 1;
      var d = 2;
      return d;
    },
  ],
  [
    "переприсваивание const",
    () => {
      try {
        const c = 1;
        c = 2;
      } catch (e) {
        return e.name;
      }
      return "нет ошибки";
    },
  ],
  [
    "const не защищает объект",
    () => {
      const o = { n: 1 };
      o.n = 2;
      return o.n;
    },
  ],
  [
    "var в цикле: все функции видят последнее i",
    () => {
      const fns = [];
      for (var i = 0; i < 3; i++) fns.push(() => i);
      return fns.map((fn) => fn());
    },
  ],
  [
    "let в цикле: у каждой итерации свой i",
    () => {
      const fns = [];
      for (let i = 0; i < 3; i++) fns.push(() => i);
      return fns.map((fn) => fn());
    },
  ],
];

const predictions = [
  /* #1  */ 1,
  /* #2  */ "undefined",
  /* #3  */ "undefined",
  /* #4  */ "undefined",
  /* #5  */ "ReferenceError",
  /* #6  */ 1,
  /* #7  */ 2,
  /* #8  */ 2,
  /* #9  */ "TypeError",
  /* #10 */ 2,
  /* #11 */ [3, 3, 3],
  /* #12 */ [0, 1, 2],
];

console.log("\n6. Область видимости — сначала предсказание, потом запуск\n");

cases.forEach(([name, run], index) => {
  check(`#${index + 1} ${name}`, run(), predictions[index]);
});

summary();
