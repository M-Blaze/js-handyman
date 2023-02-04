"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasKeys = exports.isObject = void 0;
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
                keySet.delete(prop);
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
                keySet.delete(prop);
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
                keySet.delete(prop);
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
