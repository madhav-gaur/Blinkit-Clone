import { uploadImgCloudinary } from "../utils/cloudinary.js";

export const uploadImgController = async (req, res) => {
  try {
    const file = req.file;
    const uploadImage = await uploadImgCloudinary(file)
    return res.json({
        success: true,
        message: "Image Uploaded",
        data: uploadImage
      });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
