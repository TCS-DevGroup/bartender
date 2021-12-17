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
exports.Machine = void 0;
/**
 * $Rev: 13497 $
 * $LastChangedDate: 2020-11-20 14:26:14 +0100 (Fri, 20 Nov 2020) $
 * $Author: sja $
 *
 *
 */
var typeorm_1 = require("typeorm");
var Machine = /** @class */ (function () {
    function Machine() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Machine.prototype, "machineid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Machine.prototype, "machineno", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], Machine.prototype, "orderid", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], Machine.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column({ default: null, nullable: true }),
        __metadata("design:type", Date)
    ], Machine.prototype, "createddatetime", void 0);
    __decorate([
        typeorm_1.Column({ default: null, nullable: true }),
        __metadata("design:type", Date)
    ], Machine.prototype, "createddatetimeutc", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Machine.prototype, "createusername", void 0);
    __decorate([
        typeorm_1.Column({ default: null, nullable: true }),
        __metadata("design:type", Date)
    ], Machine.prototype, "finisheddatetime", void 0);
    __decorate([
        typeorm_1.Column({ default: null, nullable: true }),
        __metadata("design:type", Date)
    ], Machine.prototype, "finisheddatetimeutc", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Machine.prototype, "finishusername", void 0);
    __decorate([
        typeorm_1.Column("longtext", { default: null }),
        __metadata("design:type", String)
    ], Machine.prototype, "notes", void 0);
    Machine = __decorate([
        typeorm_1.Entity({ name: "machine" })
    ], Machine);
    return Machine;
}());
exports.Machine = Machine;
