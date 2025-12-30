import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './stylesheets/UploadCategoryModal.css';
import { MdCloudUpload } from 'react-icons/md';
import { uploadImage } from '../utils/uploadImage';
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { toast } from 'react-toastify';
const EditCategoryModal = ({ close, fetchData, category }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState('Save Changes');
  useEffect(() => {
    if (category) {
      console.log(category)
      setName(category.name || '');
      setImage(category.image || '');
    }
  }, [category]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        close()
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [close]);

  const handleCategoryImg = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadImg = await uploadImage(file);
    setImage(uploadImg.data.data.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading('Saving...');
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: {
          categoryId: category._id,
          name,
          image,
        },
      });
      console.log(response);


      if (response.data.success) {
        // dispatch(setIsLoadedCategory(false))
        fetchData();
        toast.success('Category updated successfully');
        close();
      } else {
        toast.error(response.data.message || 'Update failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setLoading('Save Changes');
    }
  };

  const isUnchanged = name === category?.name && image === category?.image;

  return (
    <section className="upload-category-modal-wrapper">
      <div className="upload-category-modal">
        <div className="category-model-head">
          <h1>Edit Category</h1>
          <button onClick={close}>
            <IoClose />
          </button>
        </div>

        <div className="catgory-form-wrapper">
          <form className="catgory-form" onSubmit={handleSubmit}>
            <label htmlFor="categoryName">
              Name
              <input
                type="text"
                placeholder="Enter Category Name"
                value={name}
                id="categoryName"
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label htmlFor="categoryImage">Image</label>
            <label
              htmlFor="categoryImage"
              style={{ backgroundColor: image ? 'white' : '#d5efff' }}
              className="category-img-upload"
            >
              {image ? (
                <img src={image} alt="Category" />
              ) : (
                <div>
                  <p>No Image Provided</p>
                  <span>
                    <MdCloudUpload />
                    Upload Image
                  </span>
                </div>
              )}
              <input
                onChange={handleCategoryImg}
                type="file"
                id="categoryImage"
              />
            </label>

            <button type="submit" disabled={!name || !image || isUnchanged}>
              {loading}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditCategoryModal;
