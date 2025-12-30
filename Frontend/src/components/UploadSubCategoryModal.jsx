import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
// import './stylesheets/UploadCategoryModal.css'
import { MdCloudUpload } from 'react-icons/md'
import { uploadImage } from '../utils/uploadImage'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// import { toast } from 'react-toastify'
const UploadSubCategoryModal = ({ close, fetchData }) => {

    // const dispatch = useDispatch()
    const allCategory = useSelector((state => state.product.allCategory))

    const [subCategory, setSubCategory] = useState({
        name: "",
        image: "",
        category: []
    })
    useEffect(() => {
        if (allCategory.length > 0) {
            const defaultCategory = allCategory.find(cat => cat.name === "Snacks & Munchies");
            if (defaultCategory) {
                setSubCategory(prev => ({
                    ...prev,
                    category: [defaultCategory]
                }));
            }
        }
    }, [allCategory]);
    const [loading, setLoading] = useState("+ Add Sub Category")
    const handleChange = (e) => {
        const { name, value } = e.target
        setSubCategory((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const handleSubCategoryImg = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const uploadImg = await uploadImage(file)
        setSubCategory((prev) => {
            return { ...prev, image: uploadImg.data.data.url }
        })
    }
    const handleRemoveCategory = (categoryId) => {
        setSubCategory((prev) => ({
            ...prev,
            category: prev.category.filter((item) => item._id !== categoryId)
        }));
    };
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading("Uploading...")
            const response = await Axios({
                ...SummaryApi.createSubCategory,
                data: subCategory
            })

            if (response.data.success) {

                fetchData()
                toast.success("Category Added")
            }
        } catch (error) {
            console.log(error)
        } finally {
            // if (response.data.success) {
            setLoading("Added Successfully")
            setSubCategory({
                name: "",
                image: "",
                category: [],
            })
            if (allCategory.length > 0) {
                const defaultCategory = allCategory.find(cat => cat.name === "Snacks & Munchies");
                if (defaultCategory) {
                    setSubCategory(prev => ({
                        ...prev,
                        category: [defaultCategory]
                    }));
                }
            }
            setLoading("+ Add Sub Category")
            // close()
            // }
        }
    }
    return (
        <section className='upload-category-modal-wrapper'>
            <div className='upload-category-modal' style={{ "maxWidth": "35rem" }}>
                <div className='category-model-head'>
                    <h1>
                        Sub Category
                    </h1>
                    <button onClick={close}>
                        <IoClose />
                    </button>
                </div>
                <div className='catgory-form-wrapper'>
                    <form className='catgory-form' onSubmit={handleSubmit}>
                        <label htmlFor="categoryName">
                            Name
                            <input
                                type="text"
                                placeholder='Enter Sub Category Name'
                                value={subCategory.name}
                                id='subCategoryName'
                                name='name'
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="categoryImage">Image</label>
                        <label htmlFor="categoryImage" style={{ backgroundColor: subCategory.image ? "white" : "#d5efff" }} className='category-img-upload'>
                            {
                                subCategory.image ? (
                                    <img src={subCategory.image} alt="" />
                                ) :
                                    (<div>
                                        <p>No Image Provided</p>
                                        <span> <MdCloudUpload />Upload Image</span>
                                    </div>

                                    )
                            }
                            <input
                                onChange={handleSubCategoryImg}
                                type="file"
                                id='categoryImage'
                            />
                        </label>
                        <div className='category-selection'>
                            <label htmlFor="subCategory">
                                Select Category
                            </label>
                            <div className='selected-category'>
                                {
                                    subCategory.category.map((item, index) => {
                                        return <span key={index}>
                                            {item.name}
                                            <div onClick={() => handleRemoveCategory(item._id)} className='remove-selected-category'><IoClose /></div>
                                        </span>
                                    })
                                }
                            </div>
                            <select name="subCategory" id="subCategory" onChange={(e) => {
                                const value = e.target.value
                                const categoryDetails = allCategory.find(elem => elem._id === value)
                                setSubCategory((prev) => {
                                    return {
                                        ...prev, category: [...prev.category, categoryDetails]
                                    }
                                })
                            }}>
                                <option disabled value="">Select Category</option>
                                {
                                    allCategory.map((category, index) => {
                                        return <option key={index} value={category?._id}>{category?.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <button disabled={!subCategory.name || !subCategory.image || !subCategory.category[0]}>{loading}</button>
                    </form>
                </div>
            </div >
        </section >
    )
}

export default UploadSubCategoryModal
