// Задача 9. Массивы: map, filter, reduce, find, sort, some/every
//
// Реализуйте восемь функций. В комментариях указан подходящий метод,
// но использовать нужно именно его — в этом смысл задачи.
//
// В каждом задании есть блок «Вход / Выход» — сначала прочитайте его,
// затем посмотрите тесты внизу файла: они показывают, что именно проверяется.
//
// Запуск: node 01-core/tasks/09-arrays.js

import { check, summary } from "./_check.js";

const users = [
  { id: 1, name: "Анна", age: 28, city: "Москва" },
  { id: 2, name: "Борис", age: 17, city: "Казань" },
  { id: 3, name: "Вера", age: 34, city: "Москва" },
  { id: 4, name: "Глеб", age: 22, city: "Омск" },
];

const cart = [
  { title: "Книга", price: 1200, qty: 2 },
  { title: "Курс", price: 5000, qty: 1 },
  { title: "Стикеры", price: 300, qty: 4 },
];

// 9.1 namesOf(list) — массив имён. Метод: map.
//
// Вход:  массив пользователей
//        [{ id: 1, name: 'Анна', ... }, { id: 2, name: 'Борис', ... }, ...]
// Выход: новый массив только из имён, в том же порядке
//        ['Анна', 'Борис', 'Вера', 'Глеб']
//
// Что делает map:
//   1) проходит по массиву;
//   2) для каждого элемента вызывает вашу функцию;
//   3) складывает её результаты в НОВЫЙ массив.
// Было 4 пользователя — станет 4 имени, порядок сохранится.
//
// Схема:
//   list.map((user) => ...)
//                        ↑ верните то, что должно попасть в новый массив
//
// Проверка: console.log(namesOf(users)) → ['Анна', 'Борис', 'Вера', 'Глеб'].
function namesOf(list) {
  let new_list = list.map((x) => x.name);
  return new_list;
}

// 9.2 adultsOf(list) — массив пользователей 18+. Метод: filter.
//
// Вход:  users
// Выход: новый массив ТОЛЬКО из тех, у кого age >= 18, в исходном порядке.
//        По именам: ['Анна', 'Вера', 'Глеб']. Борису 17 — он не попадает.
//
// filter вызывает функцию для каждого элемента и оставляет те,
// для которых она вернула true. Новый массив может быть короче исходного.
//
// Схема: list.filter((user) => ...)   ← верните true/false: «оставить?»
function adultsOf(list) {
  return list.filter((x) => x.age >= 18);
}

// 9.3 totalOf(cart) — общая стоимость: price * qty для всех позиций. Метод: reduce.
//
// Вход:  [{ price: 1200, qty: 2 }, { price: 5000, qty: 1 }, { price: 300, qty: 4 }]
// Выход: одно число — сумма price * qty по всем позициям:
//        1200*2 + 5000*1 + 300*4 = 8600.
//        Для пустого массива [] → 0.
//
// reduce сворачивает массив в одно значение. Ему нужны:
//   1) функция (acc, item) => новое значение acc;
//   2) начальное значение acc — здесь 0.
// acc — то, что уже накоплено; item — текущая позиция корзины.
//
// Схема: cart.reduce((acc, item) => ..., 0)
function totalOf(cart) {
  return cart.reduce((sum, x) => sum + x.price * x.qty, 0);
}

// 9.4 findUser(list, id) — пользователь с нужным id или undefined. Метод: find.
//
// Вход:  массив пользователей и число id.
// Выход: первый пользователь, у которого user.id === id,
//        или undefined, если такого нет (это не ошибка).
//
// Не путайте с filter: filter всегда возвращает массив (даже пустой),
// а find — сам элемент или undefined.
function findUser(list, id) {
  return list.find((x) => x.id === id);
}

// 9.5 sortedByAge(list) — НОВЫЙ массив, отсортированный по возрасту.
// Исходный массив меняться не должен. Метод: sort на копии.
//
// Вход:  users
// Выход: новый массив по возрастанию age:
//        ['Борис' 17, 'Глеб' 22, 'Анна' 28, 'Вера' 34].
//
// Важно: sort МЕНЯЕТ массив, на котором его вызвали. Чтобы не испортить users:
//   1) сделайте копию: [...list];
//   2) отсортируйте копию с числовым компаратором (a, b) => a.age - b.age.
// Без компаратора sort сравнивает элементы как строки — порядок будет неверным.
function sortedByAge(list) {
  return [...list].sort((a, b) => a.age - b.age);
}

// 9.6 allAdults(list) — true, если ВСЕ 18+. Метод: every.
//
// Вход:  users
// Выход: true, только если у каждого age >= 18; иначе false.
//        У нас Борису 17, поэтому результат false.
//        Для пустого массива every даёт true — нарушителей нет.
//
// every останавливается на первом элементе, где условие вернуло false.
function allAdults(list) {
  return list.every((x) => x.age >= 18);
}

// 9.7 anyMinor(list) — true, если есть хотя бы один младше 18. Метод: some.
//
// Вход:  users
// Выход: true, если найдётся хотя бы один с age < 18; иначе false.
//        У нас есть Борис (17), поэтому true.
//        Для пустого массива some даёт false.
//
// some останавливается на первом элементе, где условие вернуло true.
function anyMinor(list) {
  return list.some((x) => x.age < 18);
}

// 9.8 countByCity(list) — объект вида { Москва: 2, Казань: 1 }. Метод: reduce.
//
// Вход:  users
// Выход: объект, где ключ — город, значение — сколько раз он встретился:
//        { Москва: 2, Казань: 1, Омск: 1 }.
//
// Схема:
//   list.reduce((acc, user) => {
//     // увеличьте счётчик для user.city на 1
//     return acc;    // reducer ОБЯЗАН вернуть acc
//   }, {})           // начальное значение — пустой объект
//
// Подсказка: если ключа ещё нет, acc[user.city] равно undefined,
// а (acc[user.city] ?? 0) + 1 даст 1.
function countByCity(list) {
  return list.reduce((acc, user) => {
    if (user.city in acc) {
      acc[user.city] += 1;
    } else {
      acc[user.city] = 1;
    }
    return acc;
  }, {});
}

console.log("\n9. Массивы\n");

// Независимые данные для проверок, чтобы одна нерешённая функция
// не ломала выполнение остальных.
const adultsOnly = users.filter((u) => u.age >= 18);
const adultsResult = adultsOf(users);
const sortedResult = sortedByAge(users);

check("namesOf → ['Анна', 'Борис', 'Вера', 'Глеб']", namesOf(users), [
  "Анна",
  "Борис",
  "Вера",
  "Глеб",
]);
check("adultsOf возвращает массив", Array.isArray(adultsResult), true);
check(
  "adultsOf → ['Анна', 'Вера', 'Глеб']",
  Array.isArray(adultsResult) ? adultsResult.map((u) => u.name) : adultsResult,
  ["Анна", "Вера", "Глеб"],
);

check("totalOf(cart) → 8600", totalOf(cart), 8600);
check("totalOf([]) → 0", totalOf([]), 0);

check("findUser(users, 3).name → 'Вера'", findUser(users, 3)?.name, "Вера");
check("findUser(users, 2).name → 'Борис'", findUser(users, 2)?.name, "Борис");
check("findUser(users, 99) → undefined", findUser(users, 99), undefined);

check("sortedByAge возвращает массив", Array.isArray(sortedResult), true);
check(
  "sortedByAge → ['Борис', 'Глеб', 'Анна', 'Вера']",
  Array.isArray(sortedResult) ? sortedResult.map((u) => u.name) : sortedResult,
  ["Борис", "Глеб", "Анна", "Вера"],
);
check(
  "sortedByAge не меняет исходный массив",
  users.map((u) => u.name),
  ["Анна", "Борис", "Вера", "Глеб"],
);
check(
  "sortedByAge возвращает новый массив",
  Array.isArray(sortedResult) && sortedResult !== users,
  true,
);

check("allAdults(users) → false (Борис младше 18)", allAdults(users), false);
check("allAdults(только взрослые) → true", allAdults(adultsOnly), true);

check("anyMinor(users) → true", anyMinor(users), true);
check("anyMinor(только взрослые) → false", anyMinor(adultsOnly), false);

check("countByCity → { Москва: 2, Казань: 1, Омск: 1 }", countByCity(users), {
  Москва: 2,
  Казань: 1,
  Омск: 1,
});

summary();
