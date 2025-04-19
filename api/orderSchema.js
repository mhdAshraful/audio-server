const mongoose = require("mongoose");

const OrderSCHEMA = new mongoose.Schema(
	{
		Item: { type: Object },
		userName: { type: String },
		userEmail: { type: String },
		userPhone: { type: String },
		userAddress: { type: String },
		userPostCode: { type: String },
		userCity: { type: String },
		userCountry: { type: String },
		paymentMethod: { type: String },
		e_Number: { type: String },
		e_Pin: { type: String },
		invoiceAmount: { type: String },
	},
	{ collection: "OrderInformation" }
);
const Order = mongoose.model("Order", OrderSCHEMA);
module.exports = Order;
