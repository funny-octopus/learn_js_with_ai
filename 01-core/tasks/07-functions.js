// Задача 7. Функции
//
// Реализуйте пять функций. Читайте комментарии — в них есть требования.
//
// Запуск: node 01-core/tasks/07-functions.js

import { check, summary } from "./_check.js";

// 7.1 greet(name)
// Возвращает строку "Привет, <name>!".
// Если name не передан (undefined), подставить "гость".
// Пустая строка — это переданное значение, её не заменяем.
function greet(name = "гость") {
  return "Привет, " + (name ?? "гость") + "!";
}

// 7.2 sumAll(...nums)
// Сумма всех аргументов. Без аргументов — 0.
// Подсказка: rest-параметр ...nums собирает аргументы в настоящий массив.
function sumAll(...nums) {
  let array_sum = 0;
  function sum_(x) {
    array_sum += x;
    return array_sum;
  }
  nums.forEach(sum_);

  return sum_(0);
}

// 7.3 addTag(tag, tags = [])
// Добавляет tag в конец массива tags и возвращает массив.
// Важно: значение по умолчанию не должно разделяться между вызовами.
function addTag(tag, tags = []) {
  tags.push(tag);
  return tags;
}

// 7.4 applyTwice(fn, value)
// Возвращает fn(fn(value)).
function applyTwice(fn, value) {
  return fn(fn(value));
}

// 7.5 this в методах и стрелках
// Ниже объект: regular — обычный метод, arrow — стрелочная функция.
// Ничего не меняйте в объекте — тесты проверят, как ведёт себя this.
const obj = {
  name: "объект",
  regular() {
    return this.name;
  },
  arrow: () => typeof this,
};

const first = addTag("js");
const second = addTag("css");

console.log("\n7. Функции и this\n");

check("greet() → 'Привет, гость!'", greet(), "Привет, гость!");
check("greet('Анна') → 'Привет, Анна!'", greet("Анна"), "Привет, Анна!");
check(
  "greet('') → 'Привет, !' (пустая строка не заменяется)",
  greet(""),
  "Привет, !",
);

check("sumAll() → 0", sumAll(), 0);
check("sumAll(1, 2, 3) → 6", sumAll(1, 2, 3), 6);
check("sumAll(10) → 10", sumAll(10), 10);
check("sumAll(-1, 1) → 0", sumAll(-1, 1), 0);

check("first вызов addTag('js') → ['js']", first, ["js"]);
check("второй вызов addTag('css') → ['css'], а не ['js', 'css']", second, [
  "css",
]);

check(
  "applyTwice(x => x + 1, 5) → 7",
  applyTwice((x) => x + 1, 5),
  7,
);
check(
  "applyTwice(x => x * 2, 3) → 12",
  applyTwice((x) => x * 2, 3),
  12,
);

check("obj.regular() → 'объект'", obj.regular(), "объект");
check(
  "obj.regular.call({ name: 'другой' }) → 'другой'",
  obj.regular.call({ name: "другой" }),
  "другой",
);
check(
  "obj.arrow() → 'undefined' (своего this у стрелки нет)",
  obj.arrow(),
  "undefined",
);
check(
  "obj.arrow.call({ name: 'другой' }) → 'undefined'",
  obj.arrow.call({ name: "другой" }),
  "undefined",
);

summary();
