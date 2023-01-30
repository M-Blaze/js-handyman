import { cloneDeep, isObject } from './index'

const input = {
  a: 1,
  b: [
    {
      c: 2,
      d: 3,
    },
    {
      e: 4,
      f: 5,
    },
  ],
  c: {
    d: {
      e: 1,
      f: 2,
    },
    g: {
      h: 2,
    },
    i: {
      j: 5,
    },
  },
}

describe('Clone deep module', () => {
  test('return value and input is not equal in case of non primitive data types', () => {})
})

describe('IsObject module', () => {
  test('test for shallow object', () => {
    expect(isObject(input)).toBe(true)
  })
  test('test for deep', () => {
    expect(isObject(input, { deep: false })).toBe(false)
  })
})
