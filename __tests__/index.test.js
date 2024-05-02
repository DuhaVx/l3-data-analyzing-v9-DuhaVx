// @ts-check

// eslint-disable-next-line import/no-unresolved
import { test } from 'node:test';
import assert from 'assert/strict';

import { execSync } from 'child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = { encoding: 'utf8', cwd: path.join(__dirname, '..') };
const result1 = execSync(
  'bin/vacancies.js __fixtures__/vacancies1.csv',
  // @ts-ignore
  options,
);
const result2 = execSync(
  'bin/vacancies.js __fixtures__/vacancies2.csv',
  // @ts-ignore
  options,
);
const rows1 = result1.trim().split('\n');
const rows2 = result2.trim().split('\n');

test('step1', () => {
  assert.strictEqual(rows1[0], 'Count: 8');
  assert.strictEqual(rows2[0], 'Count: 10');
});

test('step2', () => {
  assert.strictEqual(rows1[1], 'Cities: Москва, Санкт-Петербург, Екатеринбург, Краснодар, Москва, Сочи, Казань, Новосибирск');
  assert.strictEqual(rows2[1], 'Cities: Ростов-на-Дону, Сочи, Красноярск, Москва, Санкт-Петербург, Калининград, Екатеринбург, Краснодар, Москва, Нижний Новгород');
});

test('step3', () => {
  assert.strictEqual(rows1[2], 'Maximum salary: 150000');
  assert.strictEqual(rows2[2], 'Maximum salary: 130000');
});

test('step4', () => {
  assert.strictEqual(rows1[3], 'Graduated: 7');
  assert.strictEqual(rows2[3], 'Graduated: 9');
});

test('step5', () => {
  assert.strictEqual(rows1[4], 'Legal type of company and their number: { \'ООО\': 6, \'ЗАО\': 1, \'ОАО\': 1 }');
  assert.strictEqual(rows2[4], 'Legal type of company and their number: { \'ООО\': 6, \'ЗАО\': 4 }');
});
