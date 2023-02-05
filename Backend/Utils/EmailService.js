const MailJet = require("node-mailjet");

const SendEmail = async (reciever, name, data, type) => {
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
        TemplateID: type === "RESET" ? 4560457 : 4551222,
        TemplateLanguage: true,
        Subject: type === "RESET" ? "Reset Password" : "Verify Email",
        Variables:
          type === "RESET"
            ? {
                name: name,
                confirmationlink: data,
              }
            : {
                name: name,
                otp: data,
              },
      },
    ],
  });
  console.log(await request);
  return request;
};

const SendResetEmail = async (reciever, name, data, type) => {
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
        TemplateID: 4193634,
        TemplateLanguage: true,
        Subject: "Reset Password",
        Variables: {
          name: name,
          confirmation_link: data,
        },
      },
    ],
  });
  return request;
};

module.exports = { SendEmail, SendResetEmail };
