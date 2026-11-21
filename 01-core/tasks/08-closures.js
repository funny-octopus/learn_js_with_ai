// Задача 8. Замыкания
//
// Замыкание — это функция, которая помнит переменные из места, где её создали,
// даже после того, как внешняя функция завершилась.
//
// Реализуйте четыре функции.
//
// Запуск: node 01-core/tasks/08-closures.js

import { check, summary } from "./_check.js";

// 8.1 makeCounter()
// Возвращает функцию-счётчик. Первый вызов → 1, второй → 2 и так далее.
// Каждый вызов makeCounter() создаёт НЕЗАВИСИМЫЙ счётчик.
function makeCounter() {
  let counter = 0;
  let count_func = () => ++counter;
  return count_func;
}

// 8.2 once(fn)
// Возвращает обёртку, которая вызывает fn только при первом вызове
// и запоминает результат. При повторных вызовах fn не вызывается,
// а возвращается тот же результат.
function once(fn) {
  let called = false;
  let res;
  function result(...args) {
    if (!called) {
      called = true;
      res = fn(...args);
    }
    return res;
  }
  return result;
}

// 8.3 makeGreeter(greeting)
// Возвращает функцию: makeGreeter('Привет')('Анна') → 'Привет, Анна!'
function makeGreeter(greeting) {
  function mem_(name) {
    return greeting + ", " + name + "!";
  }
  return mem_;
}

// 8.4 memoize(fn)
// Возвращает обёртку, которая кэширует результаты по аргументу.
// Повторный вызов с тем же аргументом не должен вызывать fn заново.
// Подсказка: для кэша удобен new Map().
function memoize(fn) {
  const cache = new Map();

  function mem(arg) {
    if (!cache.has(arg)) {
      cache.set(arg, fn(arg));
    }
    return cache.get(arg);
  }
  return mem;
}

console.log("\n8. Замыкания\n");

const counter = makeCounter();
check("counter() → 1", counter(), 1);
check("counter() → 2", counter(), 2);
check("counter() → 3", counter(), 3);

const otherCounter = makeCounter();
check("новый счётчик начинается с 1", otherCounter(), 1);
check("старый счётчик продолжает: 4", counter(), 4);

let initCalls = 0;
const init = once(() => {
  initCalls += 1;
  return "готово";
});
check("первый вызов once → 'готово'", init(), "готово");
check("второй вызов once → 'готово'", init(), "готово");
check("внутренняя функция вызвана ровно один раз", initCalls, 1);

const hello = makeGreeter("Привет");
check("hello('Анна') → 'Привет, Анна!'", hello("Анна"), "Привет, Анна!");
check(
  "makeGreeter('Здравствуйте')('Борис') → 'Здравствуйте, Борис!'",
  makeGreeter("Здравствуйте")("Борис"),
  "Здравствуйте, Борис!",
);

let computeCalls = 0;
const slowSquare = memoize((n) => {
  computeCalls += 1;
  return n * n;
});
check("slowSquare(4) → 16", slowSquare(4), 16);
check("slowSquare(4) повторно → 16", slowSquare(4), 16);
check("slowSquare(5) → 25", slowSquare(5), 25);
check("fn вызвана 2 раза, а не 3", computeCalls, 2);

// Кэш должен помнить ВСЕ аргументы, а не только последний
const callOrder = [];
const double = memoize((n) => {
  callOrder.push(n);
  return n * 2;
});
double(4);
double(5);
check("double(4) после double(5) → 8", double(4), 8);
check("fn вызвана только для [4, 5], без повтора", callOrder, [4, 5]);

summary();
