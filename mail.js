const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const fs = require('fs');

const mailHTML = Buffer.from(
	fs.readFileSync('./views/mailTemplate.html')
).toString();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (clientEmail, userName, cb) => {
	const finalTemplate = mailHTML.replace(/{%USERNAME%}/g, userName);

	const msg = {
		to: clientEmail, // Change to your recipient
		from: process.env.EMAIL_USERNAME, // Change to your verified sender
		subject: 'Received feedback with thanks',
		html: finalTemplate,
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
			cb(null);
		})
		.catch((error) => {
			console.error(error);
			cb(err);
		});
};

module.exports = sendMail;
