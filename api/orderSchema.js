const mongoose = require("mongoose");
const Schema = mongoose.Schema
const OrderSCHEMA = new Schema({
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
    invoiceAmount: { type: String }
}, { collection: "OrderInformation" });
const mdl = mongoose.model("ORDER_SCHEMA", OrderSCHEMA);
module.exports = mdl