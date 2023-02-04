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
