const FormData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(FormData);

async function sendSimpleMessage() {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
        username: "api",
        key: process.env.API_KEY || "82584ea90567ccefac31f42ff5121492-e71583bb-19e81da6",
        // When you have an EU-domain, you must specify the endpoint:
        // url: "https://api.eu.mailgun.net"
    });
    try {
        const data = await mg.messages.create("sandbox2b261815183d47c3b6b164341a122d50.mailgun.org", {
            from: "Mailgun Sandbox <postmaster@sandbox2b261815183d47c3b6b164341a122d50.mailgun.org>",
            to: ["Vu Phong <phongvvph52328@gmail.com>"],
            subject: "Hello Vu Phong",
            text: "Congratulations Vu Phong, you just sent an email with Mailgun! You are truly awesome!",
        });

        console.log(data); // logs response data
    } catch (error) {
        console.log(error); //logs any error
    }
}

sendSimpleMessage()