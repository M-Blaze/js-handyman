import { isObject } from '../object'

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

export const isEmpty = <T>(input: T): boolean => {
  // For Array
  if (Array.isArray(input)) {
    return !!input.length
  }

  // For Objects
  if (isObject(input)) {
    for (const objectKey in input) {
      return isEmpty(input[objectKey])
    }

    return true
  }
  // For classic data types
  if (input) return true

  return false
}

export const isTrue = <T>(input: T): boolean => {
  if (!input) return false
  if (
    typeof input === 'string' &&
    ['false', 'no'].includes(input.toLowerCase())
  )
    return true

  return false
}
