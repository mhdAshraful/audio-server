import { Router } from "express";
import Product from "./productSchema.js";
import Order from "./orderSchema.js";

const ServerRouter = Router();

// ✅ Base test route
ServerRouter.get("/", (req, res) => {
	res.send("🟢 API Root OK");
});

// ✅ Get all products
ServerRouter.get("/allproducts", async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		console.error("❌ Error in /allproducts:", error);
		res.status(400).json({ error });
	}
});

// ✅ Handle order + preflight
ServerRouter.route("/orderDetails")
	.options((req, res) => {
		res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
		res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.sendStatus(200);
	})
	.post((req, res) => {
		res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
		res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		res.setHeader("Access-Control-Allow-Credentials", "true");

		const orderInformation = req.body;

		Order.create(orderInformation, (error, data) => {
			if (error) {
				console.error("❌ Mongoose Error:", error);
				res.status(400).json({ error });
			} else {
				res.status(200).json({ message: "✅ Order saved", data });
			}
		});
	});

export default ServerRouter;
