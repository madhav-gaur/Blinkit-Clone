import { subCategoryModel } from "../models/subCategoryModel.js";
import { productModel } from "../models/productModel.js";

// ? create sub category

export const addSubCategory = async (req, res) => {
  try {
    const { name, image, category } = req.body;
    if (!name || !image || !category[0]) {
      return res.json({
        success: false,
        message: "Provide Name, image and category",
      });
    }

    const subCategory = new subCategoryModel({ name, image, category });

    const saveSubCategory = await subCategory.save();
    if (!saveSubCategory) {
      return res.json({
        success: false,
        message: "Something went Wrong",
      });
    }
    return res.json({
      success: true,
      message: "Sub Category Added",
      data: saveSubCategory,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};

// ? Display categories

export const getSubCategory = async (req, res) => {
  try {
    const data = await subCategoryModel.find().populate("category");

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

export const updateSubCategory = async (req, res) => {
  try {
    const { subCategoryId, name, image, category } = req.body;
    const updatedSubCategory = await subCategoryModel.updateOne(
      {
        _id: subCategoryId,
      },
      {
        name,
        image,
        category,
      }
    );
    return res.json({
      success: true,
      message: "Sub Category Updated Successfully",
      data: updatedSubCategory,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
// ? Delete

export const deleteSubCategory = async (req, res) => {
  try {
    const { _id } = req.body;
    const checkProduct = await productModel
      .findOne({ category: { $in: [_id] } })
      .countDocuments();

    if (checkProduct > 0) {
      return res.json({
        success: false,
        message: "Sub Category already in use cannot be deleted",
      });
    }
    const deletedCategory = await subCategoryModel.deleteOne({ _id });
    return res.json({
      success: true,
      message: "Sub Category Deleted successfully",
      data: deletedCategory,
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
