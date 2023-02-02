"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = exports.SetPassword = exports.GetUser = exports.Create = void 0;
var client_1 = require("@prisma/client");
var EmailService_1 = __importDefault(require("../../Utils/EmailService"));
var services_1 = require("../Auth/services");
var service_1 = require("./service");
var uuidv4 = require("uuid").v4;
var prisma = new client_1.PrismaClient();
var Create = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var user, id, otp, expires;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findUnique({
                    where: {
                        email: data.email,
                    },
                })];
            case 1:
                user = _a.sent();
                id = uuidv4();
                if (!!user) return [3 /*break*/, 6];
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            password: uuidv4(),
                            email: data.email,
                            lastname: data.lastname,
                            firstname: data.firstname,
                            emailVerified: false,
                            id: id,
                        },
                    })];
            case 2:
                _a.sent();
                otp = (0, services_1.GenerateOtp)();
                expires = new Date();
                expires.setMinutes(expires.getMinutes() + 1);
                expires = new Date(expires);
                return [4 /*yield*/, prisma.otp.create({
                        data: {
                            id: uuidv4(),
                            user: data.email,
                            code: otp,
                            expires: expires,
                        },
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, EmailService_1.default)(data.email, data.firstname, otp)];
            case 4:
                _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, data];
            case 6: return [2 /*return*/, null];
        }
    });
}); };
exports.Create = Create;
var SetPassword = function (data, type) { return __awaiter(void 0, void 0, void 0, function () {
    var token_data, user, hashedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token_data = null;
                if (type === "RESET") {
                    token_data = (0, services_1.VerifyToken)(data.user);
                }
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            email: token_data ? token_data.email : data.user,
                        },
                    })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, service_1.hashPassword)(data.password)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, prisma.user.update({
                        where: {
                            email: user.email,
                        },
                        data: {
                            password: hashedPassword,
                        },
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [2 /*return*/, user];
            case 5: return [2 /*return*/, null];
        }
    });
}); };
exports.SetPassword = SetPassword;
var ChangePassword = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var user, checkPassword, hashedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findUnique({
                    where: {
                        email: data.email,
                    },
                })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, services_1.comparePassword)(data.password, user.password)];
            case 2:
                checkPassword = _a.sent();
                if (!checkPassword) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, service_1.hashPassword)(data.password)];
            case 3:
                hashedPassword = _a.sent();
                return [4 /*yield*/, prisma.user.update({
                        where: {
                            email: user.email,
                        },
                        data: {
                            password: hashedPassword,
                        },
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [4 /*yield*/, prisma.$disconnect()];
            case 6:
                _a.sent();
                return [2 /*return*/, user];
            case 7: return [2 /*return*/, null];
        }
    });
}); };
exports.ChangePassword = ChangePassword;
var GetUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findUnique({
                    where: {
                        id: id,
                    },
                })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 2:
                _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.GetUser = GetUser;
