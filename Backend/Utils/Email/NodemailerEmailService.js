const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const moment = require("moment");

// initialize nodemailer
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./Utils/Email/views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./Utils/Email/views/"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

const SendEventPublishEmail = (reciever, name, event) => {
  var mailOptions = {
    from: '"Godwill" <godwillonyewuchii@gmail.com>', // sender address
    to: reciever, // list of receivers
    subject: "Event Published",
    template: "publish", // the name of the template file i.e email.handlebars
    context: {
      username: name,
      eventName: event.title,
      id: event.id,
      eventVenue: event.venue,
      guestCode: event.guestCode,
      guestLink: event.eventLink,
      eventDate: moment(event.date).format("dddd, MMMM Do YYYY"),
      eventTime: event.start_time,
      timezone: event.timezone.split(" ")[0],
      url: `https://giftscircle.netlify.app/dashboard/event_details/${event.id}`,
    },
  };

  // trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};

module.exports = { SendEventPublishEmail };
