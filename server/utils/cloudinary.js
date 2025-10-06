import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImgCloudinary = async (image) => {
  if (!image) {
    throw new Error("No image file provided.");
  }

  let buffer;

  try {
    if (image.buffer) {
      buffer = image.buffer;
    } else if (image.arrayBuffer) {
      const arrayBuffer = await image.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      throw new Error("Image must be a buffer or have an arrayBuffer method.");
    }
  } catch (err) {
    throw new Error("Failed to convert image to buffer: " + err.message);
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "blinkit" }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });

    stream.end(buffer);
  });
};
