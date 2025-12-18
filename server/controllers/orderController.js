// ? Place COD order
import { nanoid } from "nanoid";
import { productModel } from "../models/productModel.js";
import { cartProductModel } from "../models/cartProductModel.js";
import { orderModel } from "../models/orderModel.js";
export const placeCODOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, delivery_address, totalAmt, totalPayblePrice } = req.body;

    if (!items || !delivery_address || !totalAmt) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    const orderId = "ORD-" + nanoid(10).toLowerCase();
    const order = await orderModel.create({
      userId,
      orderId,
      items,
      paymentId: "",
      payment_status: "COD_PENDING",
      delivery_address,
      totalPayblePrice,
      totalAmt,
      invoice_receipt: null,
    });
    for (const item of items) {
      await productModel.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }
    await cartProductModel.deleteMany({ userId });
    return res.json({
      success: true,
      message: "Order Placed Successfully (COD)",
      data: order
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Get Orders

export const getOrderItems = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({userId})
    return res.json({
      success: true,
      message: "Orders Fetched Successfully",
      data: orders
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Template

// export const registerUser = async (req, res) => {
//   try {
//     return res.json({
//       success: true,
//       message: "",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message || error });
//   }
// };
