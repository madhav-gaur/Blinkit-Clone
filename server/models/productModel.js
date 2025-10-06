import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      default: [],
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    unit: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      required: true,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    more_details: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  name: "text",
  subCategory: "text",
  description: "text",
},{
  name: 10,
  subCategory: 6,
  description: 4,
});

export const productModel = mongoose.model("product", productSchema);
