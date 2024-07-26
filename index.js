const express = require("express");
const { json } = require("express");
// import mongoose from "mongoose";
const mongoose = require("mongoose");
const cors = require("cors");
const ServerRouter = require("./api/crudRoutes.js");

require("dotenv").config();

const port = 5555;
const app = express();

// has to be before eveything else
app.use("/", (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});
// currently running in local after accepting mongoDB T&C
app.use(
	cors({
		origin: "*",
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		preflightContinue: true,
		credentials: true,
	})
);

app.use(json());

mongoose
	.connect(
		// `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@dbcluster.nlm3zmb.mongodb.net/${process.env.COLLECTION_NAME}?retryWrites=true&w=majority`
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
