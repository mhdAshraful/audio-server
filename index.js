import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ServerRouter from "./api/crudRoutes.js";

dotenv.config();

const app = express();
const port = 5555;

app.use(cors());

app.use(json());

// ✅ Connect MongoDB
mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@dbcluster.nlm3zmb.mongodb.net/${process.env.COLLECTION_NAME}`
	)
	.then(() => console.log("✅ MongoDB Connected"))
	.catch((e) => console.error("❌ DB Error:", e));

// ✅ API Routes
app.use("/", ServerRouter);

app.listen(port, () => {
	console.log(`🚀 Server running at http://localhost:${port}`);
});
