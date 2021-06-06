const sendMail = require('../mail');
const legit = require('legit');
const Feedback = require('../models/feedback');

const postFeedback = async (fullName, email, message) => {
	const feedbackObj = new Feedback({
		fullName: fullName,
		emailAddress: email,
		feedbackMessage: message,
	});

	try {
		const savedFeedback = await feedbackObj.save();
	} catch (err) {
		return res.render('index', {
			message: 'Something went wrong. ',
			status: 'failure',
		});
	}
};

exports.findMissingParameters = async (req, res) => {
	const { firstName, lastName, email, message } = req.body;
	const fullName = firstName + ' ' + lastName;
	if (!firstName || !lastName || !email || !message) {
		return res.status(401).render('index', {
			message: 'Please fill all the parameters.',
			status: 'missingParameters',
		});
	} else {
		try {
			const response = await legit(email);
			if (response.isValid) {
				postFeedback(fullName, email, message);
				await sendMail(email, fullName, (err) => {
					if (err) {
						return res.render('index', {
							message: 'Something went wrong. ',
							status: 'failure',
						});
					} else {
						return res.render('index', {
							message: 'Feedback Sent Successfully',
							status: 'success',
						});
					}
				});
			} else {
				return res.render('index', {
					message: 'Please enter a valid email address',
					status: 'failure',
				});
			}
		} catch (e) {
			console.log(e);
		}
	}
};
