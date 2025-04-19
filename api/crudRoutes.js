const { Router } = require("express");
const PRODUCT_SCHEMA = require("./productSchema.js");
const ORDER_SCHEMA = require("./orderSchema.js");
const ServerRouter = Router();

ServerRouter.route("/api").get((req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.send("Backend Connected");
});

ServerRouter.route("/api/allproducts").get((req, res) => {
	PRODUCT_SCHEMA.find({})
		.then((docs) => {
			res.status(200).json({ docs });
		})
		.catch((error) => {
			console.log("error in mongoose", error);
			res.status(400).json({ error });
		});
});
ServerRouter.route("/api/orderDetails").post((req, res) => {
	let orderInformation = req.body;
	console.log("recieved order in server----------->>>>>>>>", orderInformation);
	ORDER_SCHEMA.create(orderInformation, (error, data) => {
		if (error) {
			console.log("mongose error", error.message);
			res.status(400).json({
				"potential Error in mongose++++++++-->": error,
			});
		} else {
			res.status(200).json({ "following data recieved:---------->": data });
		}
	});
});

module.exports = ServerRouter;
