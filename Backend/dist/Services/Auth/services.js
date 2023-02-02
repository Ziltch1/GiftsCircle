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
exports.GenerateOtp = exports.VerifyToken = exports.GenerateToken = exports.comparePassword = void 0;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
// compare password
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt.compare(password, hashedPassword);
    return result;
});
exports.comparePassword = comparePassword;
const GenerateToken = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_KEY, {
        algorithm: "HS256",
        expiresIn: 4 * 60 * 60,
    });
    return token;
};
exports.GenerateToken = GenerateToken;
const VerifyToken = (token) => {
    let payload = jwt.verify(token, process.env.JWT_KEY);
    return payload;
};
exports.VerifyToken = VerifyToken;
const GenerateOtp = () => {
    let otp = otpGenerator.generate(5, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
    });
    return otp;
};
exports.GenerateOtp = GenerateOtp;
