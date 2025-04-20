import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import ServerRouter from "./api/crudRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const port = 5555;
const app = express();

let whitelist = ["https://audiophile-green-alpha.vercel.app"];

let corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not Allowed by course, Manualy set up!"));
		}
	},
	methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	exposedHeaders: ["Content-Length", "X-Knowledge-Base-Version"],
	preflightContinue: true,
};

app.use("/", (req, res, next) => {
	res.header(
		"Acces-Control-Allow-Origin",
		"https://audiophile-green-alpha.vercel.app"
	);
	next();
});
app.use(cors(corsOptions));

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
