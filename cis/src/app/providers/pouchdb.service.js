"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.__esModule = true;
var core_1 = require("@angular/core");
var pouchdb_1 = require("pouchdb");
var pouchdb_find_1 = require("pouchdb-find");
var USER_INFO = 'USER_INFO';
var USER_FORM = 'USER_FORM';
var util_1 = require("util");
var PouchDbService = /** @class */ (function () {
    function PouchDbService(electronService) {
        var _this = this;
        this.electronService = electronService;
        this.getFormsDB = function () { return _this.formsDb; };
        this.getClientsDB = function () { return _this.clientsDb; };
        this.getMetaDataDB = function () { return _this.metadataDb; };
        // getClientInfoDB = () => this.info;
        this.searchClient = function (lastName) { return __awaiter(_this, void 0, void 0, function () {
            var db, clients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(lastName);
                        db = this.clientsDb;
                        return [4 /*yield*/, db.find({
                                selector: { lastname: lastName }
                            })];
                    case 1:
                        clients = _a.sent();
                        console.log('clients in db', clients.docs);
                        return [2 /*return*/, clients.docs];
                }
            });
        }); };
        this.searchClientById = function (clientId, referralId) { return __awaiter(_this, void 0, void 0, function () {
            var clients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientsDb.find({
                            selector: {
                                clientID: clientId,
                                referralid: referralId
                            }
                        })];
                    case 1:
                        clients = _a.sent();
                        return [2 /*return*/, clients.docs];
                }
            });
        }); };
        this.searchMultiClientsByFact = function (factNo, clientID) { return __awaiter(_this, void 0, void 0, function () {
            var db, multiClients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.clientsDb;
                        return [4 /*yield*/, db.find({
                                selector: {
                                    facts: factNo
                                }
                            })];
                    case 1:
                        multiClients = _a.sent();
                        return [2 /*return*/, multiClients.docs.filter(function (data) {
                                return data.clientID !== clientID;
                            })];
                }
            });
        }); };
        this.searchMultiClientsByAllClients = function (lastName) { return __awaiter(_this, void 0, void 0, function () {
            var db, clients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.clientsDb;
                        return [4 /*yield*/, db.find({
                                selector: { lastname: lastName }
                            })];
                    case 1:
                        clients = _a.sent();
                        return [2 /*return*/, clients.docs];
                }
            });
        }); };
        this.getForms = function () { return __awaiter(_this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = [];
                        return [4 /*yield*/, this.formsDb.allDocs({ include_docs: true }).then(function (res) {
                                res.rows.map(function (row) {
                                    if (!util_1.isNullOrUndefined(row.doc.name)) {
                                        return doc.push(row.doc);
                                    }
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, doc];
                }
            });
        }); };
        this.getFormsByStatus = function (status) { return __awaiter(_this, void 0, void 0, function () {
            var forms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.formsDb.find({
                            selector: { status: status }
                        })];
                    case 1:
                        forms = _a.sent();
                        return [2 /*return*/, forms.docs];
                }
            });
        }); };
        this.getFormsByProgram = function (program) { return __awaiter(_this, void 0, void 0, function () {
            var forms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.formsDb.find({
                            selector: { program: program }
                        })];
                    case 1:
                        forms = _a.sent();
                        return [2 /*return*/, forms.docs];
                }
            });
        }); };
        this.saveUser = function (userId, firstName, lastName, reintegrationUserRightsForm, behaviorUserRightsForm, fosterCareUserRightsForm, familyPreservationUserRightsForm, oklahomaUserRightsForm) { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(userId, firstName, lastName, reintegrationUserRightsForm, behaviorUserRightsForm, fosterCareUserRightsForm, familyPreservationUserRightsForm, oklahomaUserRightsForm);
                        console.log('USER_INFO', USER_INFO);
                        return [4 /*yield*/, this.metadataDb.put({
                                _id: USER_INFO,
                                userId: userId,
                                staffName: firstName,
                                lastName: lastName,
                                UserRightsForm: [
                                    { 'reintegrationUserRightsForm': !util_1.isNullOrUndefined(reintegrationUserRightsForm) ? reintegrationUserRightsForm : null },
                                    { 'behaviorUserRightsForm': !util_1.isNullOrUndefined(behaviorUserRightsForm) ? behaviorUserRightsForm : null },
                                    { 'fosterCareUserRightsForm': !util_1.isNullOrUndefined(fosterCareUserRightsForm) ? fosterCareUserRightsForm : null },
                                    { 'familyPreservationUserRightsForm': !util_1.isNullOrUndefined(familyPreservationUserRightsForm) ? familyPreservationUserRightsForm : null },
                                    { 'oklahomaUserRightsForm': !util_1.isNullOrUndefined(oklahomaUserRightsForm) ? oklahomaUserRightsForm : null }
                                ]
                            })];
                    case 1:
                        _a.sent();
                        console.log('User saved successfully');
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error('Error in saving user', err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.saveUserForms = function (userForms) { return __awaiter(_this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.metadataDb.put({
                                _id: USER_FORM,
                                forms: [userForms]
                            })];
                    case 1:
                        _a.sent();
                        console.log('User forms saved successfully');
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.error('Error in saving user forms', err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updatePin = function (pin) { return __awaiter(_this, void 0, void 0, function () {
            var user, updateResult, err_3, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.metadataDb.get(USER_INFO)];
                    case 1:
                        user = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        console.log('Error in fetching user', err_3);
                        return [2 /*return*/];
                    case 3:
                        user.pin = pin;
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.metadataDb.put(user)];
                    case 5:
                        updateResult = _a.sent();
                        console.log('User updated with pin successfully', updateResult);
                        return [3 /*break*/, 7];
                    case 6:
                        err_4 = _a.sent();
                        console.error('Error in updating pin', err_4);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, updateResult];
                }
            });
        }); };
        this.getUser = function () { return __awaiter(_this, void 0, void 0, function () {
            var user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('USER_INFO', USER_INFO);
                        return [4 /*yield*/, this.metadataDb.get(USER_INFO)];
                    case 1:
                        user = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.log('Error in fetching user', err_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, user];
                }
            });
        }); };
        this.removeUser = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var user, err_6, removeResult, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.metadataDb.get(id)];
                    case 1:
                        user = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        console.log('Error in fetching user', err_6);
                        return [2 /*return*/];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.metadataDb.remove(user)];
                    case 4:
                        removeResult = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_7 = _a.sent();
                        console.log('Error in removing user', err_7);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, removeResult];
                }
            });
        }); };
        // if (electronService.isElectron()) {
        pouchdb_1["default"].plugin(pouchdb_find_1["default"]);
        pouchdb_1["default"].plugin(require('pouchdb-size'));
        // creating the databases
        this.createDb();
        // indexing the databases
        this.indexingDb();
        // info of the databases
        this.getInfoDb();
        console.log('Electron environment. Database initialized');
        // }
    }
    PouchDbService.prototype.createDb = function () {
        this.formsDb = new pouchdb_1["default"]('mobile-forms');
        this.clientsDb = new pouchdb_1["default"]('clients');
        this.metadataDb = new pouchdb_1["default"]('metadata');
        // this.info = new PouchDB('clientInfo');
    };
    PouchDbService.prototype.indexingDb = function () {
        this.clientsDb.createIndex({
            index: { fields: ['lastname'] }
        }).then(function (result) { return console.log('ClientsDB: Create index, result', result); })["catch"](function (err) { return console.log('Create index, error', err); });
        this.formsDb.createIndex({
            index: { fields: ['status', 'program'] }
        }).then(function (result) { return console.log('FormsDB: Create index, result', result); })["catch"](function (err) { return console.log('Create index, error', err); });
    };
    PouchDbService.prototype.getInfoDb = function () {
        this.formsDb.info().then(function (info) { return console.log('formsDb info', info); });
        this.clientsDb.info().then(function (info) { return console.log('clientsDb info', info); });
        this.metadataDb.info().then(function (info) { return console.log('info', info); });
    };
    PouchDbService = __decorate([
        core_1.Injectable()
    ], PouchDbService);
    return PouchDbService;
}());
exports.PouchDbService = PouchDbService;
