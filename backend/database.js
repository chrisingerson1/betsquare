const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Client } = require("pg");
const client = new Client({
	host: "betsquare.csihu2oh6awo.us-east-1.rds.amazonaws.com",
	user: "chris",
	port: 5432,
	password: "ChrisIngy14",
	database: "postgres",
});

const app = express();
app.use(cors());
const jsonParser = bodyParser.json();

// LOGIN call
app.post("/login", jsonParser, (req, res) => {
	client.query(
		`SELECT * FROM profile WHERE username='${req.body.user}' AND password='${req.body.pwd}'`,
		(err, response) => {
			if (!err) {
				if (response?.rows[0]) {
					res.send(response.rows[0]);
				} else {
					res.status(401).send("Incorrect username or password");
				}
			} else console.log(err.message);
		}
	);
});

// REGISTER call
app.post("/register", jsonParser, (req, res) => {
	client.query(
		`INSERT INTO profile (name, dob, username, password, email, created_on) VALUES ('${req.body.name}', '${req.body.dateOfBirth}', '${req.body.username}', '${req.body.hashPwd}', '${req.body.email}', CURRENT_TIMESTAMP)`
	);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

client.connect();
