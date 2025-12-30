// ? Place COD order
import { nanoid } from "nanoid";
import { productModel } from "../models/productModel.js";
import { cartProductModel } from "../models/cartProductModel.js";
import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";
export const placeCODOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, delivery_address, totalAmt, totalPayblePrice } = req.body;

    if (!items || !delivery_address || !totalAmt) {
      return res.orderStatus(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    const orderId = "ORD" + Date.now().toString().slice(-8);

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
    const user = await userModel.findById(userId);

    if (!user) {
      return res.orderStatus(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.order_history.push(order._id);
    await user.save();
    await cartProductModel.deleteMany({ userId });
    return res.json({
      success: true,
      message: "Order Placed Successfully (COD)",
      data: order,
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
    const orders = await orderModel.find({ userId });
    return res.json({
      success: true,
      message: "Orders Fetched Successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Template

export const adminOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    return res.json({
      success: true,
      message: "All orders Fetched",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Update Status

export const updateOrderStatus = async (req, res) => {
  try {
    const { id, orderStatus } = req.body;

    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    let updatedPaymentStatus = order.payment_status;

    switch (orderStatus) {
      case "DELIVERED":
        updatedPaymentStatus = "SUCCESS";
        break;

      case "CANCELLED_BY_USER":
      case "CANCELLED_BY_ADMIN":
      case "RETURNED":
        if (order.payment_status === "SUCCESS") {
          updatedPaymentStatus = "REFUNDED";
        } else {
          updatedPaymentStatus = orderStatus;
        }
        break;

      default:
        break;
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      {
        order_status: orderStatus,
        payment_status: updatedPaymentStatus,
      },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Order status updated",
      data: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
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
