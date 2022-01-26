"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
require('./router');
const world = 'world';
//hello()
router_1.HttpInitialize(5000);
console.log('hey');
setTimeout(ServeLoop, 1000); // Start after 1 sec to allow for other process to start up
function ServeLoop() {
    setTimeout(ServeLoop, 1000);
}
