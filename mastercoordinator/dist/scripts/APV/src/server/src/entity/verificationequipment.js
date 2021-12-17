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
exports.VerificationEquipment = void 0;
/**
 * $Rev:  $
 * $LastChangedDate:  $
 * $Author:  $
 *
 *
 */
var typeorm_1 = require("typeorm");
var VerificationEquipment = /** @class */ (function () {
    function VerificationEquipment() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], VerificationEquipment.prototype, "verificationequipmentid", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], VerificationEquipment.prototype, "equipmentname", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], VerificationEquipment.prototype, "equipmentmodel", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], VerificationEquipment.prototype, "trescalnr", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], VerificationEquipment.prototype, "measurementcategory", void 0);
    __decorate([
        typeorm_1.Column({ default: null, nullable: true }),
        __metadata("design:type", Date)
    ], VerificationEquipment.prototype, "expirationdate", void 0);
    __decorate([
        typeorm_1.Column({ default: null, nullable: true }),
        __metadata("design:type", Date)
    ], VerificationEquipment.prototype, "lastcalibrationdate", void 0);
    VerificationEquipment = __decorate([
        typeorm_1.Entity({ name: "verificationequipment" })
    ], VerificationEquipment);
    return VerificationEquipment;
}());
exports.VerificationEquipment = VerificationEquipment;
