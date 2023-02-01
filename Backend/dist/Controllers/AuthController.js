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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const Response_1 = __importDefault(require("../DTO/Request/Response"));
const Auth_1 = require("../Services/Auth");
const Users_1 = require("../Services/Users");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, Auth_1.Login)(req.body);
        if (typeof data === typeof Response_1.default) {
            return res.status(400).send(data);
        }
        return res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        yield prisma.$disconnect();
        res.status(400).send({ msg: "Request Failed" });
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, Users_1.Create)(req.body);
        if (data) {
            return res.status(201).send(data);
        }
        return res.status(400).send({ msg: "User already exists" });
    }
    catch (err) {
        console.log(err);
        yield prisma.$disconnect();
        res.status(400).send({ msg: "Request Failed" });
    }
}));
router.post("/googleSignin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, Auth_1.GoogleSignIn)(req.body);
        if (data) {
            res.status(200).send(data);
        }
        return res.status(400).send(new Response_1.default("Failed", "User not found"));
    }
    catch (err) {
        console.log(err);
        yield prisma.$disconnect();
        res.status(400).send({ msg: "Request Failed" });
    }
}));
router.post("/setPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, Users_1.SetPassword)(req.body, "SET");
        if (data) {
            res
                .status(201)
                .send(new Response_1.default("Success", "Password set successfully"));
        }
        return res.status(400).send(new Response_1.default("Failed", "User not found"));
    }
    catch (err) {
        console.log(err);
        yield prisma.$disconnect();
        res.status(400).send({ msg: "Request Failed" });
    }
}));
router.post("/resetPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, Users_1.SetPassword)(req.body, "RESET");
        if (data) {
            res
                .status(201)
                .send(new Response_1.default("Success", "Password reset successfully"));
        }
        return res.status(400).send(new Response_1.default("Failed", "User not found"));
    }
    catch (err) {
        console.log(err);
        yield prisma.$disconnect();
        res.status(400).send({ msg: "Request Failed" });
    }
}));
router.post("/verifyEmail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, Auth_1.VerifyEmail)(req.body);
        if (data) {
            res
                .status(201)
                .send(new Response_1.default("Success", "Email verified successfully"));
        }
        return res.status(400).send(new Response_1.default("Failed", "User not found"));
    }
    catch (err) {
        console.log(err);
        yield prisma.$disconnect();
        res.status(400).send({ msg: "Request Failed" });
    }
}));
router.post("/sendVerifyEmail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, Auth_1.SendVerifyEmail)(req.body.email);
        if (data.status) {
            res
                .status(201)
                .send(new Response_1.default("Success", "Email sent successfully"));
        }
        return res.status(400).send(new Response_1.default("Failed", "User not found"));
    }
    catch (err) {
        console.log(err);
        yield prisma.$disconnect();
        res.status(400).send({ msg: "Request Failed" });
    }
}));
module.exports = router;
