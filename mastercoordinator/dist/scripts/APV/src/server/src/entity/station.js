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
exports.Station = void 0;
/**
 * $Rev: 14027 $
 * $LastChangedDate: 2021-03-30 12:20:13 +0200 (Tue, 30 Mar 2021) $
 * $Author: tgj $
 *
 *
 */
var typeorm_1 = require("typeorm");
var Station = /** @class */ (function () {
    function Station() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Station.prototype, "stationid", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], Station.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ default: true }),
        __metadata("design:type", Boolean)
    ], Station.prototype, "enabled", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], Station.prototype, "ipaddress", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], Station.prototype, "c15remoteipaddress", void 0);
    __decorate([
        typeorm_1.Column({ default: "" }),
        __metadata("design:type", String)
    ], Station.prototype, "energymeteripaddress", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Station.prototype, "machineid", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], Station.prototype, "powermeters", void 0);
    __decorate([
        typeorm_1.Column({ default: true }),
        __metadata("design:type", Boolean)
    ], Station.prototype, "cantestiq", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], Station.prototype, "cantesthighspeed", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], Station.prototype, "dashboardordering", void 0);
    __decorate([
        typeorm_1.Column({ default: true }),
        __metadata("design:type", Boolean)
    ], Station.prototype, "visibleondashboard", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], Station.prototype, "newsoftwareversion", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], Station.prototype, "apvport", void 0);
    Station = __decorate([
        typeorm_1.Entity({ name: "station" })
    ], Station);
    return Station;
}());
exports.Station = Station;
