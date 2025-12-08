// ? Place COD order
import { nanoid } from "nanoid";
import { productModel } from "../models/productModel.js";
import { cartProductModel } from "../models/cartProductModel.js";
export const placeCODOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      productId,
      productDetails,
      deliveryAddress,
      totalAmt,
      totalPayblePrice,
    } = req.body;

    if (!productId || !delivery_address || !totalAmt) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    const orderId = "ORD-" + nanoid(10).toLowerCase();
    const order = await orderModel.create({
      userId,
      orderId,
      productId,
      productDetails,
      paymentId: "",
      payment_status: "COD_PENDING",
      deliveryAddress,
      totalPayblePrice,
      totalAmt,
      invoice_receipt: null,
    });

    await productModel.findOneAndUpdate(productId, { $inc: { stock: -1 } });
    await cartProductModel.deleteMany({ userId });
    return res.json({
      success: true,
      message: "Order Placed Successfully (COD)",
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
