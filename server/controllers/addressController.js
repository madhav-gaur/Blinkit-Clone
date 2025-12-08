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
      userId,
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
        model: "address",
        options: { sort: { createdAt: -1 } },
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
// ? Delete

export const disableAddress = async (req, res) => {
  try {
    const { _id } = req.body;
    const userId = req.userId;
    await addressModel.updateOne(
      { _id: _id, userId },
      {
        status: false,
      }
    );
    return res.json({
      success: true,
      message: "Address Deleted",
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
