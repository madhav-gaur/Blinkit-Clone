import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdCloudUpload } from 'react-icons/md';
import './stylesheets/UploadCategoryModal.css';
import { uploadImage } from '../utils/uploadImage';
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const EditSubCategoryModal = ({ close, data, fetchData }) => {
  const allCategory = useSelector((state) => state.product.allCategory);
    const [subCategory, setSubCategory] = useState({
    name: data.name,
    image: data.image,
    category: data.category || [],
  });

  const [loading, setLoading] = useState('Save Changes');
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
  const handleSubCategoryImg = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadImg = await uploadImage(file);
    setSubCategory(prev => ({
      ...prev,
      image: uploadImg.data.data.url
    }));
  };

  const handleRemoveCategory = (categoryId) => {
    setSubCategory(prev => ({
      ...prev,
      category: prev.category.filter(item => item._id !== categoryId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading('Saving...');
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: {
          subCategoryId: data._id,
          name: subCategory.name,
          image: subCategory.image,
          category: subCategory.category.map(cat => cat._id)
        }
      });
      if (response.data.success) {
        toast.success('Sub Category updated successfully');
        // dispatch(setIsLoadedSubCategory(false))
        fetchData();
      } else {
        toast.error(response.data.message || 'Failed to update');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading('Save Changes');
      close();

    }
  };

  return (
    <section className='upload-category-modal-wrapper'>
      <div className='upload-category-modal'>
        <div className='category-model-head'>
          <h1>Edit Sub Category</h1>
          <button onClick={close}><IoClose /></button>
        </div>

        <form className='catgory-form' onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={subCategory.name}
              onChange={(e) => setSubCategory(prev => ({ ...prev, name: e.target.value }))}
              placeholder='Enter Sub Category Name'
            />
          </label>

          <label>Image</label>
          <label
            htmlFor='subCategoryImage'
            style={{ backgroundColor: subCategory.image ? 'white' : '#d5efff' }}
            className='category-img-upload'
          >
            {subCategory.image ? (
              <img src={subCategory.image} alt='SubCategory' />
            ) : (
              <div>
                <p>No Image Provided</p>
                <span><MdCloudUpload /> Upload Image</span>
              </div>
            )}
            <input
              type="file"
              id="subCategoryImage"
              onChange={handleSubCategoryImg}
            />
          </label>

          <div className='category-selection'>
            <label>Select Category</label>
            <div className='selected-category'>
              {subCategory.category.map((item) => (
                <span key={item._id}>
                  {item.name}
                  <div onClick={() => handleRemoveCategory(item._id)} className='remove-selected-category'>
                    <IoClose />
                  </div>
                </span>
              ))}
            </div>

            <select onChange={(e) => {
              const selected = allCategory.find(cat => cat._id === e.target.value);
              if (selected && !subCategory.category.find(c => c._id === selected._id)) {
                setSubCategory(prev => ({
                  ...prev,
                  category: [...prev.category, selected]
                }));
              }
            }}>
              <option value="" disabled>Select Category</option>
              {allCategory.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <button type='submit' disabled={!subCategory.name || !subCategory.image}>{loading}</button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategoryModal;
