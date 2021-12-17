"use strict";
/**
 * $Rev: 14149 $
 * $LastChangedDate: 2021-05-10 10:26:51 +0200 (Mon, 10 May 2021) $
 * $Author: tgj $
 *
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calibrationLimitsRepository = exports.calibrationLogRepository = exports.verificationEquipmentRepository = exports.machineLogRepository = exports.machineTestHistoryRepository = exports.machineTestLogRepository = exports.machineTestRepository = exports.machineRepository = exports.orderOptionRepository = exports.orderRepository = exports.userRepository = exports.standRepository = void 0;
var typeorm_1 = require("typeorm");
var station_1 = require("./entity/station");
var user_1 = require("./entity/user");
var order_1 = require("./entity/order");
var orderoption_1 = require("./entity/orderoption");
var machine_1 = require("./entity/machine");
var machinetest_1 = require("./entity/machinetest");
var machinetestlog_1 = require("./entity/machinetestlog");
var machinelog_1 = require("./entity/machinelog");
var machinetesthistory_1 = require("./entity/machinetesthistory");
var verificationequipment_1 = require("./entity/verificationequipment");
var calibrationlog_1 = require("./entity/calibrationlog");
var calibrationlimits_1 = require("./entity/calibrationlimits");
function standRepository() {
    return typeorm_1.getConnection().getRepository(station_1.Station);
}
exports.standRepository = standRepository;
;
function userRepository() {
    return typeorm_1.getConnection().getRepository(user_1.User);
}
exports.userRepository = userRepository;
;
function orderRepository() {
    return typeorm_1.getConnection().getRepository(order_1.Order);
}
exports.orderRepository = orderRepository;
;
function orderOptionRepository() {
    return typeorm_1.getConnection().getRepository(orderoption_1.OrderOption);
}
exports.orderOptionRepository = orderOptionRepository;
;
function machineRepository() {
    return typeorm_1.getConnection().getRepository(machine_1.Machine);
}
exports.machineRepository = machineRepository;
;
function machineTestRepository() {
    return typeorm_1.getConnection().getRepository(machinetest_1.MachineTest);
}
exports.machineTestRepository = machineTestRepository;
;
function machineTestLogRepository() {
    return typeorm_1.getConnection().getRepository(machinetestlog_1.MachineTestLog);
}
exports.machineTestLogRepository = machineTestLogRepository;
;
function machineTestHistoryRepository() {
    return typeorm_1.getConnection().getRepository(machinetesthistory_1.MachineTestHistory);
}
exports.machineTestHistoryRepository = machineTestHistoryRepository;
;
function machineLogRepository() {
    return typeorm_1.getConnection().getRepository(machinelog_1.MachineLog);
}
exports.machineLogRepository = machineLogRepository;
;
function verificationEquipmentRepository() {
    return typeorm_1.getConnection().getRepository(verificationequipment_1.VerificationEquipment);
}
exports.verificationEquipmentRepository = verificationEquipmentRepository;
function calibrationLogRepository() {
    return typeorm_1.getConnection().getRepository(calibrationlog_1.CalibrationLog);
}
exports.calibrationLogRepository = calibrationLogRepository;
function calibrationLimitsRepository() {
    return typeorm_1.getConnection().getRepository(calibrationlimits_1.CalibrationLimits);
}
exports.calibrationLimitsRepository = calibrationLimitsRepository;
