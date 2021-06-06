const mongoose = require('mongoose');
const feedbackSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		maxlength: 20,
	},
	emailAddress: {
		type: String,
		maxlength: 40,
		required: true,
	},
	feedbackMessage: {
		type: String,
		required: true,
		maxlength: 150,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Feedback', feedbackSchema);
