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
const Users_1 = require("../Services/Users");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, Users_1.GetUser)(req.params.id);
        if (data) {
            res.status(201).send({ user: data });
        }
    }
    catch (err) {
        console.log(err);
        yield prisma.$disconnect();
        res.status(400).send({ msg: "User not found" });
    }
}));
router.post("/changePassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, Users_1.ChangePassword)(req.body);
        if (data) {
            res
                .status(201)
                .send(new Response_1.default("Success", "Password changed successfully"));
        }
        return res
            .status(400)
            .send(new Response_1.default("Failed", "Password is Incorrect"));
    }
    catch (err) {
        console.log(err);
        yield prisma.$disconnect();
        res.status(400).send({ msg: "Request Failed" });
    }
}));
module.exports = router;
