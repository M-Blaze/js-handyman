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
exports.cloneDeep = void 0;
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
