const { Router } = require("express");
const PRODUCT_SCHEMA = require("./schema.js");

const productRouter = Router();

productRouter.route("/api").get((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("Backend Connected");
})

productRouter.route('/api/allproducts').get((req, res) => {
    PRODUCT_SCHEMA.find((err, data) => {
        if (err) {
            console.log(err);
            res.send(err.message);

        } else {
            console.log(data);
            res.json(data);
        }
    })
})

module.exports = productRouter;


