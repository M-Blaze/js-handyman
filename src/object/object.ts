import { DefaultObject } from '../@types'

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

class HasKeys {
  shallowKeySearch(keySet: Set<string>, inputObj: DefaultObject) {
    for (const prop in inputObj) {
      if (keySet.has(prop)) return true
    }

    return false
  }

  shallowKeySearch__Every(keySet: Set<string>, inputObj: DefaultObject) {
    for (const prop in inputObj) {
      if (keySet.has(prop)) {
        keySet.delete(prop)

        if (keySet.size === 0) return true
      }
    }

    return false
  }

  deepKeySearch__Some(keySet: Set<string>, inputObj: DefaultObject) {
    const nestedObject: string[] = []

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
        this.deepKeySearch__Some(
          keySet,
          inputObj[nestedObject[i]] as DefaultObject
        )
      ) {
        return true
      }
    }

    return false
  }

  deepKeySearch__Every(keySet: Set<string>, inputObj: DefaultObject) {
    const nestedObject: string[] = []

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
        this.deepKeySearch__Every(
          keySet,
          inputObj[nestedObject[i]] as DefaultObject
        )
      ) {
        return true
      }
    }

    return false
  }

  main() {
    const vm = this

    return function (
      keys: KeyType,
      inputObj: DefaultObject,
      options?: OptionsType__HasKeys
    ) {
      const keySet = new Set(Array.isArray(keys) ? keys : [keys])

      if (keySet.size === 0) return false

      if (options?.deep) {
        if (options.searchType === 'every') {
          return vm.deepKeySearch__Every(keySet, inputObj)
        }

        return vm.deepKeySearch__Some(keySet, inputObj)
      }

      if (options?.searchType === 'every') {
        return vm.shallowKeySearch__Every(keySet, inputObj)
      }

      return vm.shallowKeySearch(keySet, inputObj)
    }
  }
}

export const hasKeys = new HasKeys().main()
