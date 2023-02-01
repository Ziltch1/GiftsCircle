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
const MailJet = require("node-mailjet");
const SendEmail = (reciever, name, data) => __awaiter(void 0, void 0, void 0, function* () {
    const mailjet = MailJet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
    const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: "godwillonyewuchii@gmail.com",
                    Name: "GiftCircle",
                },
                To: [
                    {
                        Email: reciever,
                        Name: name,
                    },
                ],
                TemplateID: 4551222,
                TemplateLanguage: true,
                Subject: "Verify Email",
                Variables: {
                    name: name,
                    otp: data,
                },
            },
        ],
    });
    request
        .then((result) => {
        return result;
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.default = SendEmail;
