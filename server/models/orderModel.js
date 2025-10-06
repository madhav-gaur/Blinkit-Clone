import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    product_details: {
      name: String,
      image: [],
    },
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: 'address',
    },
    subTotalAmt: Number,
    totalAmt: Number,
    invoice_receipt:{
        type: String,
        default: null,
    }
  },
  {
    timestamps: true,
  }
);

export const orderModel = mongoose.model("order", orderSchema);
