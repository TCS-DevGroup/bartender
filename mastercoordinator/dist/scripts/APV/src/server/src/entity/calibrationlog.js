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
exports.CalibrationLog = void 0;
/**
 * $Rev:$
 * $LastChangedDate:$
 * $Author:$
 *
 *
 */
var typeorm_1 = require("typeorm");
var CalibrationLog = /** @class */ (function () {
    function CalibrationLog() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], CalibrationLog.prototype, "logid", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        __metadata("design:type", Number)
    ], CalibrationLog.prototype, "stationid", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], CalibrationLog.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({ default: null, nullable: true }),
        __metadata("design:type", Date)
    ], CalibrationLog.prototype, "olddate", void 0);
    __decorate([
        typeorm_1.Column({ default: null, nullable: true }),
        __metadata("design:type", Date)
    ], CalibrationLog.prototype, "newdate", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], CalibrationLog.prototype, "calibratiocategory", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        __metadata("design:type", Number)
    ], CalibrationLog.prototype, "logtype", void 0);
    __decorate([
        typeorm_1.Column({ default: null }),
        __metadata("design:type", Date)
    ], CalibrationLog.prototype, "verificationdate", void 0);
    CalibrationLog = __decorate([
        typeorm_1.Entity({ name: "calibrationlog" })
    ], CalibrationLog);
    return CalibrationLog;
}());
exports.CalibrationLog = CalibrationLog;
