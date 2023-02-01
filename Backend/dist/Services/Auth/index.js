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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerifyEmail = exports.VerifyEmail = exports.GoogleSignIn = exports.Login = void 0;
const client_1 = require("@prisma/client");
const Response_1 = __importDefault(require("../../DTO/Request/Response"));
const EmailService_1 = __importDefault(require("../../Utils/EmailService"));
const services_1 = require("./services");
const { v4: uuidv4 } = require("uuid");
const prisma = new client_1.PrismaClient();
const Login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (user) {
        let checkPasssword = yield (0, services_1.comparePassword)(data.password, user.password);
        if (checkPasssword) {
            yield prisma.$disconnect();
            let token = (0, services_1.GenerateToken)(data.email);
            return { token, user };
        }
        return new Response_1.default("Failed", "Email or Password is Incorrect");
    }
    return new Response_1.default("Failed", "Email or Password is Incorrect");
});
exports.Login = Login;
const GoogleSignIn = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (user) {
        let token = (0, services_1.GenerateToken)(user.email);
        yield prisma.$disconnect();
        return { token, user };
    }
    return null;
});
exports.GoogleSignIn = GoogleSignIn;
const VerifyEmail = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let token_data = (0, services_1.VerifyToken)(token);
    const user = yield prisma.user.findUnique({
        where: {
            email: token_data.email,
        },
    });
    if (user) {
        yield prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                emailVerified: true,
            },
        });
        yield prisma.$disconnect();
        return user;
    }
    return null;
});
exports.VerifyEmail = VerifyEmail;
const SendVerifyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (user) {
        try {
            let otp = (0, services_1.GenerateOtp)();
            var expires = new Date();
            expires.setMinutes(expires.getMinutes() + 1);
            expires = new Date(expires);
            yield prisma.otp.create({
                data: {
                    id: uuidv4(),
                    user: user.email,
                    code: otp,
                    expires: expires,
                },
            });
            let result = yield (0, EmailService_1.default)(email, user.firstname, otp);
            return result.response;
        }
        catch (error) {
            console.log(error);
        }
    }
    return null;
});
exports.SendVerifyEmail = SendVerifyEmail;
const VerifyOtp = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = yield prisma.otp.findFirst({
        where: {
            code: code,
        },
    });
    if (otp) {
        try {
            var expires = new Date().getTime();
            var otp_date = new Date(otp.expires).getTime();
            if (otp_date < expires) {
                yield prisma.user.update({
                    where: {
                        email: otp.user,
                    },
                    data: {
                        emailVerified: true,
                    },
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return null;
});
