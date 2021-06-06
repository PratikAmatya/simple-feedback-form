const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const formRoute = require('./routes/form');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());

const DB_CONNECTION = process.env.DB_CONNECTION.replace(
	'<password>',
	process.env.DB_PASSWORD
);

// Connect to DB
mongoose.connect(
	DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.log('ERROR OCCURED:' + err);
		} else {
			console.log('DB Connection Succesful');
		}
	}
);

// Data Parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setting View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

const port = process.env.PORT || 3000;

// Routing
app.use('/', formRoute);

app.use((req, res) => {
	res.send('<h1>Error 404</h1>');
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
