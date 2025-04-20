const express = require("express");
const { json } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ServerRouter = require("./api/crudRoutes.js");

require("dotenv").config();

const port = 5555;
const app = express();

const allowedOrigins = [
	"http://localhost:3000",
	"https://audiophile-green-alpha.vercel.app",
];


app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
		exposedHeaders: ["Content-Length", "X-Knowledge-Base-Version"],
		credentials: true,
	})
);

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
	console.log(`Server 🚀 at http://localhost:${port}`);
});
