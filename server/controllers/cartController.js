// ? add to cart

import { cartProductModel } from "../models/cartProductModel.js";

export const addTocart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    const existingCartItem = await cartProductModel.findOne({
      productId,
      userId,
    });
    if (existingCartItem) {
      // console.log(existingCartItem);
      existingCartItem.quantity += quantity || 1;
      await existingCartItem.save();

      return res.json({
        success: true,
        message: "Cart Updated",
        data: existingCartItem,
      });
    }
    const newCartItem = new cartProductModel({
      productId,
      userId,
      quantity: quantity || 1,
    });
    await newCartItem.save();
    return res.json({
      success: true,
      message: "Product Added to cart",
      data: newCartItem,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

// ? get cart

export const getCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItems = await cartProductModel
      .find({ userId })
      .populate("productId");
    return res.json({
      success: true,
      message: "Cart Items Loaded",
      data: cartItems,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Update Cart item qnt

export const updateCartItemQty = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItemId, updation } = req.body;
    console.log("updation", updation);

    let update = {};
    if (updation === "add") {
      update = { $inc: { quantity: 1 } };
    } else if (updation === "remove") {
      update = { $inc: { quantity: -1 } };
    } else {
      return res.json({ success: false, message: "Invalid updation type" });
    }

    const product = await cartProductModel.findOneAndUpdate(
      { _id: cartItemId, userId },
      update,
      { new: true }
    );

    if (!product) {
      return res.json({ success: false, message: "Cart item not found" });
    }
    if (product.quantity <= 0) {
      await cartProductModel.findByIdAndDelete(product._id);
      return res.json({
        success: true,
        message: "Cart item removed (quantity reached 0)",
      });
    }

    return res.json({
      success: true,
      message: updation === "add" ? "Quantity added" : "Quantity removed",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

export const deleteCartProductOnProductDelete = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.json({
        success: false,
        message: "Provide Product Id",
      });
    }
    const objectId = new mongoose.Types.ObjectId(_id);

    const cartProductFind = await cartProductModel.find({
      productId: _id,
    });
    const cartProduct = await cartProductModel.deleteMany({
      productId: objectId,
    });
    console.log("cartProductFind ", cartProductFind);
    // console.log("cartProduct ", cartProduct);

    return res.json({
      success: true,
      message: "Product Deleted",
      data: { cartProductFind },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Delete Cart Item

export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItemId } = req.body;
    const cartItem = await cartProductModel.findOne({
      userId,
      _id: cartItemId,
    });

    await cartProductModel.findByIdAndDelete({ userId, _id: cartItemId });

    return res.json({
      success: true,
      message: "Cart Item Deleted",
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
