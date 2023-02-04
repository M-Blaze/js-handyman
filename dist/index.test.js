"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
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
describe('Clone deep module', function () {
    test('return value and input is not equal in case of non primitive data types', function () { });
});
describe('IsObject module', function () {
    test('test for shallow object', function () {
        expect((0, index_1.isObject)(input)).toBe(true);
    });
    test('test for deep', function () {
        expect((0, index_1.isObject)(input, { deep: false })).toBe(false);
    });
});
