import { Schema, model } from "mongoose";

const productSchema = new Schema(
	{
		id: { type: Number },
		category: { type: String },
		categoryimage: {
			type: Object,
			desktop: { type: String },
			mobile: { type: String },
			tablet: { type: String },
		},
		description: { type: String },
		features: { type: String },
		gallery: {
			type: Object,
			first: {
				type: Object,
				desktop: { type: String },
				mobile: { type: String },
				tablet: { type: String },
			},
			second: {
				type: Object,
				desktop: { type: String },
				mobile: { type: String },
				tablet: { type: String },
			},
			third: {
				type: Object,
				desktop: { type: String },
				mobile: { type: String },
				tablet: { type: String },
			},
		},
		image: {
			type: Object,
			desktop: { type: String },
			mobile: { type: String },
			tablet: { type: String },
		},
		includes: {
			type: Array,
			document: {
				type: Object,
				item: { type: String },
				quantity: { type: Number },
			},
		},
		name: { type: String },
		new: { type: Boolean },
		others: {
			type: Array,
			Document: {
				type: Object,
				image: {
					type: Object,
					desktop: { type: String },
					mobile: { type: String },
					tablet: { type: String },
				},
				name: { type: String },
				slug: { type: String },
			},
		},
		price: {
			type: Number,
		},
		slug: { type: String },
	},
	{ collection: "AllProducts" }
);

const Product = model("Product", productSchema);
export default Product;
