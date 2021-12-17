"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineTest = void 0;
/**
 * $Rev: 13419 $
 * $LastChangedDate: 2020-11-06 10:48:38 +0100 (Fri, 06 Nov 2020) $
 * $Author: tgj $
 *
 *
 */
var typeorm_1 = require("typeorm");
var MachineTest = /** @class */ (function () {
    function MachineTest() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], MachineTest.prototype, "machinetestid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], MachineTest.prototype, "machineid", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], MachineTest.prototype, "testid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], MachineTest.prototype, "testname", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], MachineTest.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column({ default: null, length: 5000, nullable: true }) // comment: "The configuration of the test class as a JSON (must be parsed). Null if no configuration is required for the test." 
        ,
        __metadata("design:type", String)
    ], MachineTest.prototype, "configuration", void 0);
    __decorate([
        typeorm_1.Column({ default: null, length: 5000, nullable: true }) // comment: "The result in JSON
        ,
        __metadata("design:type", String)
    ], MachineTest.prototype, "result", void 0);
    MachineTest = __decorate([
        typeorm_1.Entity({ name: "machinetest" }),
        typeorm_1.Unique("idx1", ["machineid", "machinetestid"])
    ], MachineTest);
    return MachineTest;
}());
exports.MachineTest = MachineTest;
