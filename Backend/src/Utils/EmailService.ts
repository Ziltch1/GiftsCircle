import { request } from "http";

const MailJet = require("node-mailjet");

const SendEmail = async (reciever: string, name: string, data: string) => {
  const mailjet = MailJet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );
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
 return request;
};

export default SendEmail;
