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
exports.MachineLog = void 0;
/**
 * $Rev: 14051 $
 * $LastChangedDate: 2021-04-06 12:37:03 +0200 (Tue, 06 Apr 2021) $
 * $Author: tgj $
 *
 *
 */
var typeorm_1 = require("typeorm");
var MachineLog = /** @class */ (function () {
    function MachineLog() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], MachineLog.prototype, "machinelogid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], MachineLog.prototype, "machineid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], MachineLog.prototype, "datetime", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], MachineLog.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], MachineLog.prototype, "text", void 0);
    MachineLog = __decorate([
        typeorm_1.Entity({ name: "machinelog" }),
        typeorm_1.Unique("idx1", ["machineid", "machinelogid"])
    ], MachineLog);
    return MachineLog;
}());
exports.MachineLog = MachineLog;
