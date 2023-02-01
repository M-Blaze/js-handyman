import { DefaultObject } from './@types'
/**
 *   Clone utility function
 *   @param {Any} input - Initial product price
 *   @return {Any} Price of the product
 **/

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

export const cloneDeep = <T>(input: T): T => {
  if (Array.isArray(input)) {
    const clonedArray = input.map((item) => cloneDeep(item))

    return clonedArray as T
  }

  if (typeof input === 'object') {
    for (const key in input) {
      input[key] = cloneDeep(input[key])
    }

    return { ...input }
  }

  return input
}

type OptionsType__IsObject = {
  deep?: boolean
}

export const isObject = <T>(
  input: T,
  options?: OptionsType__IsObject
): boolean => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return false
  }

  if (options?.deep) {
    for (const prop in input) {
      if (!isObject(input[prop], options)) return false
    }
  }

  return true
}

type KeyType = string | string[]
type OptionsType__HasKeys = {
  deep?: boolean
  searchType?: 'some' | 'every'
}

const keySearch__Shallow = (keySet: Set<string>, inputObj: DefaultObject) => {
  for (const prop in inputObj) {
    if (keySet.has(prop)) return true
  }

  return false
}

const keySearch__Shallow__Every = (
  keySet: Set<string>,
  inputObj: DefaultObject
) => {
  for (const prop in inputObj) {
    if (keySet.has(prop)) {
      keySet.delete(prop)

      if (keySet.size === 0) return true
    }
  }

  return false
}

const keySearch__Deep__Some = (
  keySet: Set<string>,
  inputObj: DefaultObject
) => {
  const nestedObject = []

  for (const prop in inputObj) {
    if (keySet.has(prop)) {
      keySet.delete(prop)

      if (keySet.size === 0) return true
    }
    if (isObject(inputObj[prop])) {
      nestedObject.push(prop)
    }
  }

  for (let i = 0; i < nestedObject.length; i++) {
    if (
      keySearch__Deep__Some(keySet, inputObj[nestedObject[i]] as DefaultObject)
    ) {
      return true
    }
  }

  return false
}

const keySearch__Deep__Every = (
  keySet: Set<string>,
  inputObj: DefaultObject
) => {
  const nestedObject = []

  for (const prop in inputObj) {
    if (keySet.has(prop)) {
      keySet.delete(prop)

      if (keySet.size === 0) return true
    }
    if (isObject(inputObj[prop])) {
      nestedObject.push(prop)
    }
  }

  for (let i = 0; i < nestedObject.length; i++) {
    if (
      keySearch__Deep__Every(keySet, inputObj[nestedObject[i]] as DefaultObject)
    ) {
      return true
    }
  }

  return false
}

export const hasKeys = (
  keys: KeyType,
  inputObj: DefaultObject,
  options?: OptionsType__HasKeys
) => {
  const keySet = new Set(Array.isArray(keys) ? keys : [keys])

  if (keySet.size === 0) return false

  if (options?.deep) {
    if (options.searchType === 'every') {
      return keySearch__Deep__Every(keySet, inputObj)
    }

    return keySearch__Deep__Some(keySet, inputObj)
  }

  if (options?.searchType === 'every') {
    return keySearch__Shallow__Every(keySet, inputObj)
  }

  return keySearch__Shallow(keySet, inputObj)
}
