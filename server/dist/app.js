"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
require('./router');
const world = 'world';
function hello(word = world) {
    return `Hello ${world}! `;
}
exports.hello = hello;
hello();
router_1.HttpInitialize(5000);
console.log('hey');
