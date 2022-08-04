const functions = require("firebase-functions");
var request = require("request");

const SENDGRID_API_KEY = "Your API Key";

exports.sendEmail = functions.https.onRequest((request, response) => {
  var headers = {
    Authorization: `Bearer ${SENDGRID_API_KEY}`,
    "Content-Type": "application/json",
  };

  var dataString = {
    personalizations: [
      {
        to: [{ email: "john.doe@example.com", name: "John Doe" }],
        subject: "Hello, World!",
      },
    ],
    content: [{ type: "text/plain", value: "Heya!" }],
    from: { email: "sam.smith@example.com", name: "Sam Smith" },
    reply_to: { email: "sam.smith@example.com", name: "Sam Smith" },
  };

  var options = {
    url: "https://api.sendgrid.com/v3/mail/send",
    method: "POST",
    headers: headers,
    body: JSON.stringify(dataString),
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log(body);
      response.send({ message: "Email sent!", error: "none" });
    } else {
      console.log(error);
      response.send({ message: "Email not sent!", error: error });
    }
  });
});
