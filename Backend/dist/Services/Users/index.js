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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = exports.SetPassword = exports.GetUser = exports.Create = void 0;
const client_1 = require("@prisma/client");
const services_1 = require("../Auth/services");
const service_1 = require("./service");
const { v4: uuidv4 } = require("uuid");
const prisma = new client_1.PrismaClient();
const Create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    const id = uuidv4();
    if (!user) {
        yield prisma.user.create({
            data: {
                password: uuidv4(),
                email: data.email,
                lastname: data.lastname,
                firstname: data.firstname,
                id: id,
            },
        });
        yield prisma.$disconnect();
        return data;
    }
    return null;
});
exports.Create = Create;
const SetPassword = (data, type) => __awaiter(void 0, void 0, void 0, function* () {
    let token_data = null;
    if (type === "RESET") {
        token_data = (0, services_1.VerifyToken)(data.user);
    }
    const user = yield prisma.user.findUnique({
        where: {
            email: token_data ? token_data.email : data.user,
        },
    });
    if (user) {
        let hashedPassword = yield (0, service_1.hashPassword)(data.password);
        yield prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                password: hashedPassword,
            },
        });
        yield prisma.$disconnect();
        return user;
    }
    return null;
});
exports.SetPassword = SetPassword;
const ChangePassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (user) {
        let checkPassword = yield (0, services_1.comparePassword)(data.password, user.password);
        if (checkPassword) {
            let hashedPassword = yield (0, service_1.hashPassword)(data.password);
            yield prisma.user.update({
                where: {
                    email: user.email,
                },
                data: {
                    password: hashedPassword,
                },
            });
        }
        yield prisma.$disconnect();
        return user;
    }
    return null;
});
exports.ChangePassword = ChangePassword;
const GetUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    yield prisma.$disconnect();
    return user;
});
exports.GetUser = GetUser;
