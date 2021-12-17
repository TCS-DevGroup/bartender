"use strict";
/**
 * $Rev:  $
 * $LastChangedDate:  $
 * $Author:  $
 *
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateCalibrationLimits = exports.GetCalibrationLimits = exports.GetStandIP = exports.GetStandPorts = exports.Updatesoftware = exports.ShareStandStatus = exports.pullVerificationLog = exports.pullCalibrationLog = exports.pullVerificationEquipment = exports.BroadcastUpdate = exports.HttpInitialize = void 0;
var repositories_1 = require("../../server/src/repositories");
var app_1 = require("./app");
var g_httpServer;
var g_io;
function HttpInitialize(portno) {
    var express = require("express");
    var app = express();
    var bodyParser = require("body-parser");
    app.use(bodyParser.json());
    g_httpServer = require("http").Server(app);
    app.set("view engine", "ejs");
    //app.set("views", "../client/dist" );
    app.set("views", "dist");
    app.set("view options", { layout: false });
    // Pages    
    app.get('/', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render('homepage');
                return [2 /*return*/];
            });
        });
    });
    app.get('/dashboard', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render('dashboard');
                return [2 /*return*/];
            });
        });
    });
    app.get('/calibration', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render('calibration');
                return [2 /*return*/];
            });
        });
    });
    app.get('/developer', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render('developer');
                return [2 /*return*/];
            });
        });
    });
    app.use(express.static("dist"));
    // Verification Equipment
    app.get('/api/v1/calibrationEquipment/pull', exports.pullVerificationEquipment); // Pull all veryfication equipment data from DB
    app.get('/api/v1/calibrationlog/pull', exports.pullCalibrationLog); // Pull all the calibration log from DB
    app.get('/api/v1/verificationlog/pull', exports.pullVerificationLog); // Pull verification log entry from DB 
    app.get('/api/v1/stands/status/:stand', exports.ShareStandStatus);
    app.post('/api/v1/updatesoftware', exports.Updatesoftware);
    app.get('/api/v1/port', exports.GetStandPorts);
    app.get('/api/v1/ip', exports.GetStandIP);
    app.get('/api/v1/getcalibrationslimits', exports.GetCalibrationLimits);
    app.post('/api/v1/calculatecalibrationslimits', exports.CalculateCalibrationLimits);
    /*
    // Stand Port from DB
    app.get     ( '/api/v1/ports',                              ShareStandPorts );
    // Serverhost IP
    app.get     ( '/api/v1/ip',                                 ShareServeIP );
    */
    g_httpServer.listen(portno, function (err) {
        if (err) {
            console.error(err);
        }
        g_io = require('socket.io').listen(g_httpServer, {
            log: false,
            agent: false,
            origins: '*:*',
            transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
        });
        g_io.on("connection", function (socket) {
            console.log("a user connected");
            socket.on("disconnect", function (message) {
                console.log("a user disconnected");
            });
        });
        console.info("Listening on *." + portno);
    });
}
exports.HttpInitialize = HttpInitialize;
function BroadcastUpdate() {
    g_io.emit("update");
}
exports.BroadcastUpdate = BroadcastUpdate;
exports.pullVerificationEquipment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var equipments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, repositories_1.verificationEquipmentRepository().find()];
            case 1:
                equipments = _a.sent();
                if (equipments != undefined) {
                    return [2 /*return*/, res.status(200).json(equipments)];
                }
                else
                    return [2 /*return*/, res.status(404).send('Calibration equipment not found')];
                return [2 /*return*/];
        }
    });
}); };
exports.pullCalibrationLog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var calibrationLog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, repositories_1.calibrationLogRepository().find({ where: [{ logtype: 1 }] })];
            case 1:
                calibrationLog = _a.sent();
                if (calibrationLog != undefined)
                    return [2 /*return*/, res.json(calibrationLog)];
                else
                    return [2 /*return*/, res.status(404).send('CalibrationLog not found')];
                return [2 /*return*/];
        }
    });
}); };
exports.pullVerificationLog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var verificationlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, repositories_1.calibrationLogRepository().find({ where: [{ logtype: 2 }] })];
            case 1:
                verificationlog = _a.sent();
                if (verificationlog != undefined)
                    return [2 /*return*/, res.json(verificationlog)];
                else
                    return [2 /*return*/, res.status(404).send('Verification log not found')];
                return [2 /*return*/];
        }
    });
}); };
exports.ShareStandStatus = function (req, res) {
    var stand = parseInt(req.params.stand);
    console.log('incoming request for stand:', stand);
    //mastercoordinator.SendStandStatusRequestToServers ( stand );
    var standStatus = app_1.mastercoordinator.getStatusLst(stand);
    //console.log ( standStatus );
    res.status(200).json(standStatus);
};
function CheckForResponse(req, res, stand) {
    var status = app_1.mastercoordinator.getStandStatus(stand);
    if (status) {
        console.log('Answer from stand:', stand);
        res.status(200).json(status);
    }
    else {
        setTimeout(CheckForResponse, 500, req, res, stand);
    }
}
exports.Updatesoftware = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var StationsCheckedForUpdate, st, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body.user);
                console.log(req.body.stationsChecked);
                StationsCheckedForUpdate = req.body.stationsChecked;
                console.log('Update software request:', StationsCheckedForUpdate);
                return [4 /*yield*/, repositories_1.standRepository().find()];
            case 1:
                st = _a.sent();
                if (!st) return [3 /*break*/, 3];
                for (i = 0; i < st.length; i++) {
                    if (StationsCheckedForUpdate[i] == true) {
                        st[i].newsoftwareversion = true;
                    }
                }
                return [4 /*yield*/, repositories_1.standRepository().save(st)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                res.status(200).send('OK');
                return [2 /*return*/];
        }
    });
}); };
exports.GetStandPorts = function (req, res) {
    res.status(200).json(app_1.mastercoordinator.getAllPorts());
};
exports.GetStandIP = function (req, res) {
    res.status(200).json(app_1.mastercoordinator.getIP());
};
exports.GetCalibrationLimits = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var calibrationsLimits;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Getting calibration limits');
                return [4 /*yield*/, repositories_1.calibrationLimitsRepository().find()];
            case 1:
                calibrationsLimits = _a.sent();
                console.log(calibrationsLimits);
                return [2 /*return*/];
        }
    });
}); };
exports.CalculateCalibrationLimits = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sensorsChecked, calibrationResponse, waterFlowResults, FlowWaterMeanAndStandardDeviation, orderOption, machine, ChemistryDataContainer, chemistryResults, FlowChemistryMeanAndStandardDeviation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sensorsChecked = req.body.sensorsChecked;
                console.log(req.body.sensorsChecked);
                console.log('Update software request:', sensorsChecked);
                calibrationResponse = [];
                if (!sensorsChecked[2]) return [3 /*break*/, 2];
                return [4 /*yield*/, repositories_1.machineTestRepository().find({
                        where: { testid: 4 }, select: ["result"]
                    })];
            case 1:
                waterFlowResults = _a.sent();
                FlowWaterMeanAndStandardDeviation = app_1.mastercoordinator.CalculateFlowWaterMeanAndStandardDeviation(waterFlowResults);
                console.log(waterFlowResults);
                console.log('\n');
                calibrationResponse.push(FlowWaterMeanAndStandardDeviation);
                _a.label = 2;
            case 2:
                if (!sensorsChecked[3]) return [3 /*break*/, 6];
                return [4 /*yield*/, repositories_1.orderOptionRepository().find()];
            case 3:
                orderOption = _a.sent();
                return [4 /*yield*/, repositories_1.machineRepository().find()];
            case 4:
                machine = _a.sent();
                ChemistryDataContainer = app_1.mastercoordinator.GetChemistryData(orderOption, machine);
                return [4 /*yield*/, repositories_1.machineTestRepository().find({
                        where: { testid: 7 }
                    })];
            case 5:
                chemistryResults = _a.sent();
                FlowChemistryMeanAndStandardDeviation = app_1.mastercoordinator.CalculateChemistryMeanAndStandardDeviation(chemistryResults, ChemistryDataContainer);
                calibrationResponse.push(FlowChemistryMeanAndStandardDeviation);
                _a.label = 6;
            case 6:
                res.status(200).json(calibrationResponse);
                return [2 /*return*/];
        }
    });
}); };
