// Задача 10. Объекты: деструктуризация, spread, Object.entries
//
// Реализуйте семь функций.
//
// Запуск: node 01-core/tasks/10-objects.js

import { check, summary } from "./_check.js";

// 10.1 describeUser(user) → "Анна, 28".
// Деструктурируйте объект: name переименуйте в userName,
// age задайте значение по умолчанию 'неизвестен'.
function describeUser(user) {
  const { name: userName, age } = user;
  return userName + ", " + age;
}

// 10.2 coordsToString(point) → "(10; 20)".
// Деструктурируйте массив [x, y].
function coordsToString(point) {
  const [x, y] = point;
  return "(" + x + "; " + y + ")";
}

// 10.3 headAndTail(array) → { first, rest }.
// Используйте деструктуризацию с rest-элементом.
function headAndTail(array) {
  const [first, ...tail] = array;
  return { first: first, rest: tail };
}

// 10.4 updateUser(user, changes) → НОВЫЙ объект с обновлёнными полями.
// Исходный user меняться не должен. Используйте spread.
function updateUser(user, changes) {
  return { ...user, ...changes };
}

// 10.5 entriesOf(object) → массив пар [ключ, значение].
// Используйте Object.entries.
function entriesOf(object) {
  // TODO
  return undefined;
}

// 10.6 toStringList(object) → массив строк "ключ=значение".
// Например, { a: 1, b: 2 } → ['a=1', 'b=2'].
function toStringList(object) {
  // TODO
  return undefined;
}

// 10.7 cityOf(user) → город или 'неизвестно'.
// Используйте вложенную деструктуризацию со значением по умолчанию:
// const { address: { city } = {} } = user;
function cityOf(user) {
  // TODO
  return undefined;
}

const baseUser = { name: "Анна", age: 28, city: "Москва" };
const updatedUser = updateUser(baseUser, { city: "Сочи", age: 29 });

console.log("\n10. Объекты\n");

check(
  "describeUser({ name: 'Анна', age: 28 }) → 'Анна, 28'",
  describeUser(baseUser),
  "Анна, 28",
);
check(
  "describeUser({ name: 'Борис' }) → 'Борис, неизвестен'",
  describeUser({ name: "Борис" }),
  "Борис, неизвестен",
);
check(
  "describeUser({ name: 'Вера', age: 0 }) → 'Вера, 0'",
  describeUser({ name: "Вера", age: 0 }),
  "Вера, 0",
);

check(
  "coordsToString([10, 20]) → (10; 20)",
  coordsToString([10, 20]),
  "(10; 20)",
);
check("coordsToString([0, 0]) → (0; 0)", coordsToString([0, 0]), "(0; 0)");

check(
  "headAndTail([1, 2, 3]) → { first: 1, rest: [2, 3] }",
  headAndTail([1, 2, 3]),
  {
    first: 1,
    rest: [2, 3],
  },
);
check("headAndTail(['a']) → { first: 'a', rest: [] }", headAndTail(["a"]), {
  first: "a",
  rest: [],
});
check("headAndTail([]) → { first: undefined, rest: [] }", headAndTail([]), {
  first: undefined,
  rest: [],
});

check("updatedUser.city → 'Сочи'", updatedUser?.city, "Сочи");
check("updatedUser.age → 29", updatedUser?.age, 29);
check(
  "базовый объект не изменён: baseUser.city → 'Москва'",
  baseUser.city,
  "Москва",
);
check(
  "остальные поля сохранены: updatedUser.name → 'Анна'",
  updatedUser?.name,
  "Анна",
);
check(
  "updateUser возвращает новый объект",
  updatedUser !== baseUser &&
    typeof updatedUser === "object" &&
    updatedUser !== null,
  true,
);

check(
  "entriesOf({ a: 1, b: 2 }) → [['a', 1], ['b', 2]]",
  entriesOf({ a: 1, b: 2 }),
  [
    ["a", 1],
    ["b", 2],
  ],
);
check("entriesOf({}) → []", entriesOf({}), []);

check(
  "toStringList({ a: 1, b: 2 }) → ['a=1', 'b=2']",
  toStringList({ a: 1, b: 2 }),
  ["a=1", "b=2"],
);
check("toStringList({}) → []", toStringList({}), []);

check(
  "cityOf({ address: { city: 'Москва' } }) → 'Москва'",
  cityOf({ address: { city: "Москва" } }),
  "Москва",
);
check("cityOf({}) → 'неизвестно'", cityOf({}), "неизвестно");
check(
  "cityOf({ address: {} }) → 'неизвестно'",
  cityOf({ address: {} }),
  "неизвестно",
);

summary();
