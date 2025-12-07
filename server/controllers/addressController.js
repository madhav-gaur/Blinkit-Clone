// ? Add address

import mongoose from "mongoose";
import { addressModel } from "../models/addressModel.js";
import { userModel } from "../models/userModel.js";

export const createAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address_line, city, state, pincode, country, mobile } = req.body;
    const newAddress = new addressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      userId
    });
    await newAddress.save();
    console.log(newAddress);
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: newAddress._id,
      },
    });
    return res.json({
      success: true,
      message: "Address Saved Successfully",
      data: newAddress,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Get address

// export const getAddress = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const address = await addressModel.find({
//       userId: mongoose.Types.ObjectId(userId),
//     });
//     return res.json({
//       success: true,
//       message: "Address Loaded",
//       data: address,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message || error });
//   }
// };
export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const userWithAddresses = await userModel
      .findById(userId)
      .select("address_details") // only load the address ids
      .populate({
        path: "address_details",
        model: "address", // make sure this matches your address model name
        options: { sort: { createdAt: -1 } }, // optional: sort addresses
      })
      .lean();

    const addresses = userWithAddresses?.address_details || [];

    return res.json({
      success: true,
      message: "Address Loaded",
      data: addresses,
    });
  } catch (err) {
    console.error("getAddress_viaPopulate error:", err);
    return res
      .status(500)
      .json({ success: false, message: err.message || err });
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
