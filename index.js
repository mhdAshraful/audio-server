import express from "express";
import { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import ServerRouter from "./api/crudRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const port = 5555;
const app = express();

let whitelist = [
	"http://localhost:3000",
	"https://audiophile-green-alpha.vercel.app",
];

let corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not Allowed by course, Manualy set up!"));
		}
	},
};

// cors({
// 	origin: function (origin, callback) {
// 		if (!origin || allowedOrigins.includes(origin)) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error("Not allowed by CORS"));
// 		}
// 	},
// 	methods: ["GET", "POST", "OPTIONS"],
// 	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
// 	exposedHeaders: ["Content-Length", "X-Knowledge-Base-Version"],
// 	credentials: true,
// });

app.use(
	cors(corsOptions, {
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
		exposedHeaders: ["Content-Length", "X-Knowledge-Base-Version"],
		credentials: true,
	})
);

app.use(json());

connect(
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
