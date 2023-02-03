"use strict";
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
exports.__esModule = true;
exports.hasKeys = exports.isObject = exports.cloneDeep = void 0;
/**
 *   Clone utility function
 *   @param {Any} input - Initial product price
 *   @return {Any} Price of the product
 **/
var input = {
    a: 1,
    b: [
        {
            c: 2,
            d: 3
        },
        {
            e: 4,
            f: 5
        },
    ],
    c: {
        d: {
            e: 1,
            f: 2
        },
        g: {
            h: 2
        },
        i: {
            j: 5,
            x: 10
        }
    }
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
var HasKeys = /** @class */ (function () {
    function HasKeys() {
    }
    HasKeys.prototype.shallowKeySearch = function (keySet, inputObj) {
        for (var prop in inputObj) {
            if (keySet.has(prop))
                return true;
        }
        return false;
    };
    HasKeys.prototype.shallowKeySearch__Every = function (keySet, inputObj) {
        for (var prop in inputObj) {
            if (keySet.has(prop)) {
                keySet["delete"](prop);
                if (keySet.size === 0)
                    return true;
            }
        }
        return false;
    };
    HasKeys.prototype.deepKeySearch__Some = function (keySet, inputObj) {
        var nestedObject = [];
        for (var prop in inputObj) {
            if (keySet.has(prop)) {
                keySet["delete"](prop);
                if (keySet.size === 0)
                    return true;
            }
            if ((0, exports.isObject)(inputObj[prop])) {
                nestedObject.push(prop);
            }
        }
        for (var i = 0; i < nestedObject.length; i++) {
            if (this.deepKeySearch__Some(keySet, inputObj[nestedObject[i]])) {
                return true;
            }
        }
        return false;
    };
    HasKeys.prototype.deepKeySearch__Every = function (keySet, inputObj) {
        var nestedObject = [];
        for (var prop in inputObj) {
            if (keySet.has(prop)) {
                keySet["delete"](prop);
                if (keySet.size === 0)
                    return true;
            }
            if ((0, exports.isObject)(inputObj[prop])) {
                nestedObject.push(prop);
            }
        }
        for (var i = 0; i < nestedObject.length; i++) {
            if (this.deepKeySearch__Every(keySet, inputObj[nestedObject[i]])) {
                return true;
            }
        }
        return false;
    };
    HasKeys.prototype.main = function () {
        var vm = this;
        console.log(exports.isObject);
        return function (keys, inputObj, options) {
            var keySet = new Set(Array.isArray(keys) ? keys : [keys]);
            if (keySet.size === 0)
                return false;
            if (options === null || options === void 0 ? void 0 : options.deep) {
                if (options.searchType === 'every') {
                    return vm.deepKeySearch__Every(keySet, inputObj);
                }
                return vm.deepKeySearch__Some(keySet, inputObj);
            }
            if ((options === null || options === void 0 ? void 0 : options.searchType) === 'every') {
                return vm.shallowKeySearch__Every(keySet, inputObj);
            }
            return vm.shallowKeySearch(keySet, inputObj);
        };
    };
    return HasKeys;
}());
exports.hasKeys = new HasKeys().main();
