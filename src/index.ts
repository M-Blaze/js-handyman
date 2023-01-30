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

console.log(isObject(input))
