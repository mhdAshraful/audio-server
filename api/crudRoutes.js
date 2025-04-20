import { Router } from "express";
import Product from "./productSchema.js";
import Order from "./orderSchema.js";
const ServerRouter = Router();

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
// This route was missing per-request CORS headers and handling preflight OPTIONS request.
// correction .options() is handling the preflight CORS request, which the browser sends before POST when custom headers or non-simple requests are involved.

ServerRouter.route("/api/orderDetails")
	.options((req, res) => {
		// ✅ For preflight requests
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

		let orderInformation = req.body;

		Order.create(orderInformation, (error, data) => {
			if (error) {
				res.status(400).json({
					"❌ Mongose error ++-->": error,
				});
			} else {
				res.status(200).json({
					"😓 Data recieved:---->": data,
				});
			}
		});
	});

export default ServerRouter;
