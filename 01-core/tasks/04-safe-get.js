// Задача 4. Безопасное чтение данных: ?. и ??
//
// Дан объект пользователя (может быть неполным — так приходит data с сервера).
// Реализуйте три функции, используя optional chaining (?.)
// и nullish coalescing (??).
//
// Важно: fallback срабатывает только на null и undefined.
// Значения 0, false и '' НЕ считаются отсутствием.
//
// Запуск: node 01-core/tasks/04-safe-get.js

import { check, summary } from "./_check.js";

const fullUser = {
  user: {
    name: "Анна",
    address: { city: "Москва" },
    tags: ["frontend", "js"],
  },
  count: 0,
};

const emptyUser = {};
const partialUser = { user: { name: "Борис" }, count: 5 };

// 4.1 Верните город или 'неизвестно', если данных нет.
function cityOf(data) {
  return data?.user?.address?.city ?? "неизвестно";
}

// 4.2 Верните первый тег или 'без тегов', если тегов нет.
function firstTagOf(data) {
  return data?.user?.tags?.[0] ?? "без тегов";
}

// 4.3 Верните data.count, а если его нет (null/undefined) — fallback.
function countOf(data, fallback) {
  return data?.count ?? fallback;
}

console.log("\n4. ?. и ??\n");

check("cityOf(fullUser) → 'Москва'", cityOf(fullUser), "Москва");
check("cityOf(emptyUser) → 'неизвестно'", cityOf(emptyUser), "неизвестно");
check("cityOf(partialUser) → 'неизвестно'", cityOf(partialUser), "неизвестно");
check(
  "cityOf({ user: null }) → 'неизвестно'",
  cityOf({ user: null }),
  "неизвестно",
);

check("firstTagOf(fullUser) → 'frontend'", firstTagOf(fullUser), "frontend");
check(
  "firstTagOf(partialUser) → 'без тегов'",
  firstTagOf(partialUser),
  "без тегов",
);
check(
  "firstTagOf({ user: { tags: [] } }) → 'без тегов'",
  firstTagOf({ user: { tags: [] } }),
  "без тегов",
);

check("countOf(fullUser, 10) → 0 (а не 10!)", countOf(fullUser, 10), 0);
check("countOf(partialUser, 0) → 5", countOf(partialUser, 0), 5);
check("countOf(emptyUser, 10) → 10", countOf(emptyUser, 10), 10);
check("countOf({ count: null }, 7) → 7", countOf({ count: null }, 7), 7);
check(
  "countOf({ count: false }, 7) → false",
  countOf({ count: false }, 7),
  false,
);

summary();
