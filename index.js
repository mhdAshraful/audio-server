import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ServerRouter from "./api/crudRoutes.js";

dotenv.config();

const app = express();
const port = 5555;

// ✅ Whitelist your frontend domain
const whitelist = [
	"https://audiophile-green-alpha.vercel.app",
];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	exposedHeaders: ["Content-Length"],
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(json());

// ✅ Connect MongoDB
mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@dbcluster.nlm3zmb.mongodb.net/${process.env.COLLECTION_NAME}`
	)
	.then(() => console.log("✅ MongoDB Connected"))
	.catch((e) => console.error("❌ DB Error:", e));

// ✅ API Routes
app.use("/api", ServerRouter);

app.listen(port, () => {
	console.log(`🚀 Server running at http://localhost:${port}`);
});
