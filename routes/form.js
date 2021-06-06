const express = require('express');
const router = express.Router();
const formController = require('../controllers/form');

router.get('/', (req, res) => {
	res.render('index', {
		message: '',
		status: '',
	});
});

router.post('/', formController.findMissingParameters);

module.exports = router;
