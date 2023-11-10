import { test, expect } from 'bun:test';
import { isEmpty } from '../utils/is.ts';

test('2 + 2', () => {
  expect(2 + 2).toBe(4);
});

test('isEmpty', () => {
  expect(isEmpty(null)).toBe(true);
  expect(isEmpty(undefined)).toBe(true);
  // expect(isEmpty(false)).toBe(true);
  expect(isEmpty(0)).toBe(false);
  expect(isEmpty('')).toBe(true);
  expect(isEmpty([])).toBe(true);
  expect(isEmpty({})).toBe(true);
  expect(isEmpty(new Set())).toBe(true);
  expect(isEmpty(new Map())).toBe(true);
  expect(isEmpty(new Date())).toBe(true);
  expect(isEmpty(new Error())).toBe(true);
  expect(isEmpty(new Boolean())).toBe(true);
  expect(isEmpty(new Number())).toBe(true);
  expect(isEmpty(new String())).toBe(true);
  expect(isEmpty(new ArrayBuffer())).toBe(true);
  expect(isEmpty(new Int8Array())).toBe(true);
  expect(isEmpty(new Uint8Array())).toBe(true);
  expect(isEmpty(new Uint8ClampedArray())).toBe(true);
  expect(isEmpty(new Int16Array())).toBe(true);
  expect(isEmpty(new Uint16Array())).toBe(true);
  expect(isEmpty(new Int32Array())).toBe(true);
  expect(isEmpty(new Uint32Array())).toBe(true);
  expect(isEmpty(new Float32Array())).toBe(true);
  expect(isEmpty(new Float64Array())).toBe(true);
  expect(isEmpty(new BigInt64Array())).toBe(true);
  expect(isEmpty(new BigUint64Array())).toBe(true);
  expect(isEmpty(new Promise(() => {}))).toBe(false);
  expect(isEmpty(new WeakMap())).toBe(true);
  expect(isEmpty(new WeakSet())).toBe(true);
  expect(isEmpty(new Proxy({}, {}))).toBe(true);
  expect(isEmpty(new Set([1, 2, 3]))).toBe(false);
  // expect(
  //   isEmpty(
  //     new Map([
  //       [1, 2],
  //       [3, 4]
  //     ])
  //   )
  // ).toBe(true);
  expect(isEmpty(new Date(2017, 1, 2))).toBe(false);
  expect(isEmpty(new Error('test'))).toBe(false);
  expect(isEmpty(new Boolean(true))).toBe(false);
  // expect(isEmpty(new Number(1))).toBe(false);
});
