// ? Add category

import { categoryModel } from "../models/categoryModel.js";
import { subCategoryModel } from "../models/subCategoryModel.js";
import { productModel } from "../models/productModel.js";

export const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.json({
        success: false,
        message: "Provide Name and Image",
      });
    }

    const category = new categoryModel({ name, image });

    const saveCategory = await category.save();
    if (!saveCategory) {
      return res.json({
        success: false,
        message: "Something went Wrong",
      });
    }
    return res.json({
      success: true,
      message: "Category Added",
      data: saveCategory,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

// ? Display categories

export const getCategory = async (req, res) => {
  try {
    const data = await categoryModel.find();

    return res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Update categories

export const updateCategory = async (req, res) => {
  try {
    const { categoryId, name, image } = req.body;
    const updatedCategory = await categoryModel.updateOne(
      {
        _id: categoryId,
      },
      {
        name,
        image,
      }
    );
    return res.json({
      success: true,
      message: "Category Updated Successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Delete

export const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.body;
    const checkSubCategory = await subCategoryModel
      .findOne({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();
    const checkProduct = await productModel
      .findOne({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();
    if (checkProduct > 0 || checkSubCategory > 0) {
      return res.json({
        success: false,
        message: "Category already in use cannot be deleted",
      });
    }
    const deletedCategory = await categoryModel.deleteOne({ _id });
    return res.json({
      success: true,
      message: "Category Deleted successfully",
      data: deletedCategory
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
