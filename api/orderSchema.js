const mongoose = require("mongoose");
const Schema = mongoose.Schema
const OrderSCHEMA = new Schema({
    orderID: { type: Number },
    billingInfo: { type: Array },
    shippingInfo: { type: Array },
    orderedItemInfo: { type: Array },
    paymentInfo: { type: Array }
}, { collection: "OrderInformation" });
const mdl = mongoose.model("ORDER_SCHEMA", OrderSCHEMA);
module.exports = mdl