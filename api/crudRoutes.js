const { Router } = require("express");
const Product = require("./productSchema.js");
const Order = require("./orderSchema.js");
const ServerRouter = Router();

ServerRouter.route("/api").get((req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.send("Backend Connected");
});

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
		res.setHeader(
			"Access-Control-Allow-Origin",
			"https://audiophile-green-alpha.vercel.app"
		);
		res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		return res.status(200).end();
	})
	.post((req, res) => {
		res.setHeader(
			"Access-Control-Allow-Origin",
			"https://audiophile-green-alpha.vercel.app"
		);
		res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");

		let orderInformation = req.body;

		Order.create(orderInformation, (error, data) => {
			if (error) {
				console.log("mongose error", error.message);
				res.status(400).json({
					"Mongose Error ++-->": error,
				});
			} else {
				res.status(200).json({
					"Data recieved:---->": data,
				});
			}
		});
	});

module.exports = ServerRouter;
