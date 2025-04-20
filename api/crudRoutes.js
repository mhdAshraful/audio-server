import { Router } from "express";
import Product from "./productSchema.js";
import Order from "./orderSchema.js";
const ServerRouter = Router();
import dotenv from "dotenv";
dotenv.config();
ServerRouter.route("/api/allproducts").get((req, res) => {
	Product.find({})
		.then((docs) => {
			res.status(200).send(docs);
		})
		.catch((error) => {
			console.log("error in mongoose", error);
			res.status(400).json({ error });
		});
});

export default ServerRouter;
