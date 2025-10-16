// ? Add address

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
    newAddress.save();
    const addUserAddressId = await userModel.findByIdAndUpdate(userId, {
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
