// Мини-проверка для задач. Этот файл редактировать не нужно.
let passed = 0;
let failed = 0;

function normalize(value) {
  if (typeof value === 'number' && Number.isNaN(value)) return 'NaN';
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'bigint') return `${value}n`;
  if (typeof value === 'symbol') return value.toString();
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'function') return 'function';
  if (Array.isArray(value)) return `[${value.map(normalize).join(', ')}]`;
  if (typeof value === 'object') {
    const entries = Object.entries(value).map(([key, item]) => `${key}: ${normalize(item)}`);
    return `{ ${entries.join(', ')} }`;
  }
  return String(value);
}

function isEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => Object.hasOwn(b, key) && isEqual(a[key], b[key]));
}

export function check(name, actual, expected) {
  if (isEqual(actual, expected)) {
    passed += 1;
    console.log(`  ✅ ${name}`);
  } else {
    failed += 1;
    console.log(`  ❌ ${name}`);
    console.log(`     получено:  ${normalize(actual)}`);
    console.log(`     ожидалось: ${normalize(expected)}`);
  }
}

export function checkThrows(name, fn) {
  try {
    fn();
    failed += 1;
    console.log(`  ❌ ${name} — ошибка не была выброшена`);
  } catch {
    passed += 1;
    console.log(`  ✅ ${name}`);
  }
}

export function summary() {
  console.log('');
  console.log(`Итог: ${passed} прошло, ${failed} не прошло.`);
  if (failed > 0) {
    process.exitCode = 1;
    console.log('Есть что поправить — это нормально. Читайте сообщения выше.');
  } else {
    console.log('Всё прошло. Покажите файл мне на ревью — важно, как написано, а не только результат.');
  }
}
