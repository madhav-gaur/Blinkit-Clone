import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: string,
      default: "",
    },
    pincode: {
      type: string,
    },
    country: {
      type: string,
      default: "India",
    },
    mobile: {
      type: mobile,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const addressModel = mongoose.model("address", addressSchema);
