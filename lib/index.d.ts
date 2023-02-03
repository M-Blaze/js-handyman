/**
 *   Clone utility function
 *   @param {Any} input - Initial product price
 *   @return {Any} Price of the product
 **/
export declare const cloneDeep: <T>(input: T) => T;
declare type OptionsType__IsObject = {
    deep?: boolean;
};
export declare const isObject: <T>(input: T, options?: OptionsType__IsObject) => boolean;
export {};
