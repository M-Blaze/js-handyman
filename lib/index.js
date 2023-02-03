"use strict";
/**
 *   Clone utility function
 *   @param {Any} input - Initial product price
 *   @return {Any} Price of the product
 **/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.cloneDeep = void 0;
var input = {
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
};
var cloneDeep = function (input) {
    if (Array.isArray(input)) {
        var clonedArray = input.map(function (item) { return (0, exports.cloneDeep)(item); });
        return clonedArray;
    }
    if (typeof input === 'object') {
        for (var key in input) {
            input[key] = (0, exports.cloneDeep)(input[key]);
        }
        return __assign({}, input);
    }
    return input;
};
exports.cloneDeep = cloneDeep;
var isObject = function (input, options) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
        return false;
    }
    if (options === null || options === void 0 ? void 0 : options.deep) {
        for (var prop in input) {
            if (!(0, exports.isObject)(input[prop], options))
                return false;
        }
    }
    return true;
};
exports.isObject = isObject;
console.log((0, exports.isObject)(input));
