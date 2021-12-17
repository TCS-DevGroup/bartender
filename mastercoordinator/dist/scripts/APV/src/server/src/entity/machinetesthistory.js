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
exports.MachineTestHistory = void 0;
/**
 * $Rev: 13881 $
 * $LastChangedDate: 2021-02-23 10:57:33 +0100 (Tue, 23 Feb 2021) $
 * $Author: sja $
 *
 *
 */
var typeorm_1 = require("typeorm");
var MachineTestHistory = /** @class */ (function () {
    function MachineTestHistory() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], MachineTestHistory.prototype, "machinetesthistoryid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], MachineTestHistory.prototype, "machineid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], MachineTestHistory.prototype, "machinetestid", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], MachineTestHistory.prototype, "machinetestname", void 0);
    __decorate([
        typeorm_1.Index(),
        typeorm_1.Column({ default: null }),
        __metadata("design:type", Date)
    ], MachineTestHistory.prototype, "datetime", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        __metadata("design:type", Number)
    ], MachineTestHistory.prototype, "stationid", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], MachineTestHistory.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], MachineTestHistory.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], MachineTestHistory.prototype, "usererror", void 0);
    __decorate([
        typeorm_1.Column({ default: null, length: 5000, nullable: true }),
        __metadata("design:type", String)
    ], MachineTestHistory.prototype, "usererrortext", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], MachineTestHistory.prototype, "errorcode", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], MachineTestHistory.prototype, "errortext", void 0);
    MachineTestHistory = __decorate([
        typeorm_1.Entity({ name: "machinetesthistory" })
    ], MachineTestHistory);
    return MachineTestHistory;
}());
exports.MachineTestHistory = MachineTestHistory;
