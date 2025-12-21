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
    items: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        product_details: {
          name: String,
          image: [String],
          price: Number,
          discount: Number,
        },
      },
    ],
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
    order_status: {
      type: String,
      enum: [
        "CONFIRMED",
        "PACKED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",

        "CANCELLED_BY_USER",
        "CANCELLED_BY_ADMIN",
        "CANCELLED_OUT_OF_STOCK",

        "DELIVERY_FAILED",
        "RETURN_REQUESTED",
        "RETURNED",
        "REFUNDED",
      ],
      default: "CONFIRMED",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },
    subTotalAmt: Number,
    totalAmt: Number,
    invoice_receipt: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const orderModel = mongoose.model("order", orderSchema);
