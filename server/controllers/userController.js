import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendEmail } from "./sendEmail.js";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { generatedAccessToken } from "../utils/generateAccessToken.js";
import { generatedRefreshToken } from "../utils/generateRefreshToken.js";
import { uploadImgCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
// ? New User Registration

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Provide Email, name and Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email/code${save._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify Email from Blinkit",
      html: verifyEmailTemplate(name, verifyEmailUrl),
    });

    return res.json({
      success: true,
      message: "User Registered Successfully",
      data: save,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Verify Email

export const verifyEmailControler = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await userModel.findOne({ _id: code });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Request!!",
      });
    }

    const updateUser = await userModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );
    return res.json({
      success: true,
      message: "User Successfully Verified",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

// ? User Login

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Provide Email and Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }
    if (user.status !== "Active") {
      return res.json({
        success: false,
        message: "Account not Active contact admin",
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);
    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);

    return res.json({
      success: true,
      message: "Login Successfully",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? User Logout

export const logoutUser = async (req, res) => {
  try {
    const userId = req.userId;
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    await res.clearCookie("accessToken", cookieOption);
    await res.clearCookie("refreshToken", cookieOption);

    const removeRefreshToken = await userModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    res.json({
      success: true,
      message: "Logout Successfull",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Upload user Profile/Avatar

export const uploadAvatar = async (req, res) => {
  try {
    const image = req.file;
    const userId = req.userId;
    const upload = await uploadImgCloudinary(image);
    const updatedUser = await userModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });
    res.json({
      success: true,
      message: "Profile Uploaded",
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ?update user

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, password, mobile } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, select: "-password" } // Return updated doc, exclude password
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
// ? Forgot Password

// export const registerUser = async (req, res) => {
//     try {

//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message :error.message || error})
//     }
// };

// ? Refresh token controller

export const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return res.json({
        success: false,
        message: "Invalid token",
      });
    }
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return res.json({
        success: false,
        message: "Token expired",
      });
    }
    const userId = verifyToken?.id;
    const newAccessToken = await generatedAccessToken(userId);
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.cookie("accessToken", newAccessToken, cookieOption);
    return res.json({
      success: true,
      message: "New Access token generated",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

// ? get login user details

export const userDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel
      .findById(userId)
      .select("-password -refresh_token");
    return res.json({
      success: true,
      message: "user details",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

// ? All Users

export const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();
    return res.json({
      success: true,
      message: "Users Fetched",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
