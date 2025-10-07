import { productModel } from "../models/productModel.js";

// ? create product

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      stock,
      unit,
      more_details,
      price,
      category,
      subCategory,
      discount,
    } = req.body;
    if (
      !name ||
      !image[0] ||
      !description ||
      !stock ||
      !price ||
      !unit ||
      !category[0] ||
      !subCategory[0] ||
      !discount
    )
      return res.json({
        success: false,
        message: "Enter required fields",
      });
    const product = new productModel({
      name,
      image,
      description,
      stock,
      price,
      unit,
      more_details,
      category,
      subCategory,
      discount,
    });
    const saveProduct = await product.save();
    return res.json({
      success: true,
      message: "Product Uploaded Sucessfully",
      data: saveProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

export const getProduct = async (req, res) => {
  try {
    let { page, limit, search } = req.body;
    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * limit;
    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const [data, totalCount] = await Promise.all([
      productModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      productModel.countDocuments(query),
    ]);

    return res.json({
      success: true,
      message: "pruduct data",
      totalCount,
      data,
      totalNoPage: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const allProduct = await productModel.find();
    return res.json({
      success: true,
      message: "",
      data: allProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

export const getProductByCategoryAndSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId, page, limit } = req.body;
    if (!categoryId || !subCategoryId) {
      return res.json({
        success: false,
        message: "Provide categoryId and subcategoryId",
      });
    }
    if (!page) {
      page: 1;
    }
    if (!limit) {
      limit: 10;
    }
    return res.json({
      success: true,
      message: "",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

// updateProductDetails: {
//   url: "/api/product/update-product-details",
//   method: "put",
// },

// ? Update Product

// import productModel from/ "../models/productModel.js";

export const updateProductDetails = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { _id, ...updateData } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Provide Product ID",
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Updated Successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// ? Delete Product

export const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(req.body)
    if (!_id) {
      return res.json({
        success: false,
        message: "Provide Product Id",
      });
    }
    const product = await productModel.findByIdAndDelete(_id);
    return res.json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Search 

export const searchProduct = async (req, res) => {
  try {
    
    return res.json({
      success: true,
      message: "",
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
