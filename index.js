const express = require("express");
const { json } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ServerRouter = require("./api/crudRoutes.js");

require("dotenv").config();

const port = 5555;
const app = express();

const corsOptions = {
	origin: [
		"https://audiophile-green-alpha.vercel.app",
		"http://localhost:3000",
	],
	methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	exposedHeaders: ["Content-Length", "X-Knowledge-Base-Version"],
	credentials: true,
	maxAge: 86400, // Cache preflight response for 24 hours
	preflightContinue: false,
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(json());

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@dbcluster.nlm3zmb.mongodb.net/${process.env.COLLECTION_NAME}`
	)
	.then(() => {
		console.log("database connected");
	})
	.catch((e) => {
		console.log("Error detected:", e);
	});

app.use("/", ServerRouter);

app.listen(port, () => {
	console.log(`server running at ${port}`);
});
