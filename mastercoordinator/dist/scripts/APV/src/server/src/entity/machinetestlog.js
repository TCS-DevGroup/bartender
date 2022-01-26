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
exports.MachineTestLog = void 0;
/**
 * $Rev: 13419 $
 * $LastChangedDate: 2020-11-06 10:48:38 +0100 (Fri, 06 Nov 2020) $
 * $Author: tgj $
 *
 *
 */
var typeorm_1 = require("typeorm");
var MachineTestLog = /** @class */ (function () {
    function MachineTestLog() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], MachineTestLog.prototype, "machinetestlogid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], MachineTestLog.prototype, "machineid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], MachineTestLog.prototype, "machinetestid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], MachineTestLog.prototype, "machinetesthistoryid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], MachineTestLog.prototype, "datetime", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], MachineTestLog.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], MachineTestLog.prototype, "text", void 0);
    MachineTestLog = __decorate([
        typeorm_1.Entity({ name: "machinetestlog" }),
        typeorm_1.Unique("idx1", ["machinetestid", "machinetestlogid"]),
        typeorm_1.Unique("idx2", ["machineid", "machinetestlogid"])
    ], MachineTestLog);
    return MachineTestLog;
}());
exports.MachineTestLog = MachineTestLog;
