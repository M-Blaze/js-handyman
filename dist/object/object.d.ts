import { DefaultObject } from '../@types';
type OptionsType__IsObject = {
    deep?: boolean;
};
export declare const isObject: <T>(input: T, options?: OptionsType__IsObject) => boolean;
type KeyType = string | string[];
type OptionsType__HasKeys = {
    deep?: boolean;
    searchType?: 'some' | 'every';
};
export declare const hasKeys: (keys: KeyType, inputObj: DefaultObject, options?: OptionsType__HasKeys) => boolean;
export {};
