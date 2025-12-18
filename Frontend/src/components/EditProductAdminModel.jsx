// import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
// import './stylesheets/UploadProduct.css'
import Axios from '../utils/axios'
import { MdFullscreen } from "react-icons/md";
import { toast } from 'react-toastify';
import SummaryApi from '../common/summaryAPI'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { uploadImage } from '../utils/uploadImage'
import ViewImage from '../components/ViewImage';
import AddFieldComponent from '../components/AddFieldComponent';
import sweetAlert from '../utils/sweetAlert'
import { useState } from 'react';
import { useSelector } from 'react-redux';
const EditProductAdminModel = ({ close, data, fetchProductData, setOpenMenuId, setEditProductAdminModel }) => {

    const allCategory = useSelector(state => state.product.allCategory)
    const subCategory = useSelector(state => state.product.subCategory)

    const [product, setProduct] = useState({
        name: data.name || "",
        image: data.image || [],

        category: (data.category || []).map(catId => {
            if (typeof catId === "object") return catId;
            return allCategory.find(c => c._id === catId) || { _id: catId, name: catId };
        }),
        subCategory: (data.subCategory || []).map(subId => {
            if (typeof subId === "object") return subId;
            return subCategory.find(c => c._id === subId) || { _id: subId, name: subId };
        }),
        unit: data.unit || "",
        stock: data.stock || "",
        price: data.price || "",
        discount: data.discount || "",
        description: data.description || "",
        more_details: data.more_details || {},
    })


    const [uploadText, setUploadText] = useState('Add Image')
    const [viewImage, setViewImage] = useState(false)
    const [url, setUrl] = useState('')
    const [selectCategory, setSelectCategory] = useState("")
    const [selectSubCategory, setSelectSubCategory] = useState("")
    const [openAddField, setOpenAddField] = useState(false)
    const [fieldName, setFieldName] = useState('')
    // console.log(selectSubCategory)
    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const handleProductImg = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setUploadText('Uploading...')
        try {

            const imageResponse = await uploadImage(file)
            setUploadText('Uploaded Sucessfully')

            setProduct((prev) => ({
                ...prev,
                image: [...prev.image, imageResponse.data.url],

            }));

            setTimeout(() => {
                setUploadText('Add more Images')

            }, 2000);
        } catch (error) {
            console.error(error)
            setUploadText('Upload Failed')
            setTimeout(() => setUploadText('Upload Image'), 2000);
        }
    }
    const handleDelete = (image) => {
        // setProduct((prev))
        // const find = product.image.find(item => item === image)
        // console.log(find)
        setProduct((prev) => ({
            ...prev,
            image: prev.image.filter(item => item != image)
        }))
    }
    const handleRemoveSelectedCategory = (category) => {
        // const find = product.category.find(item => item === category)
        // console.log(find)
        setProduct((prev) => ({
            ...prev,
            category: prev.category.filter(item => item != category)
        }))
    }
    const handleRemoveSelectedSubCategory = (subCateg) => {
        // console.log(subCategory)
        // const find = product.subCategory.find(item => (console.log(item._id)))
        // console.log(find)
        setProduct((prev) => ({
            ...prev,
            subCategory: prev.subCategory.filter(item => item._id != subCateg._id)
        }))
    }
    const handleAddField = () => {

        setProduct((prev) => {
            return {
                ...prev,
                more_details: {
                    ...prev.more_details,
                    [fieldName]: ""
                }
            }
        })
        setFieldName("")
        setOpenAddField(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.updateProductDetails,
                data: {
                    _id: data._id,
                    ...product
                }
            })
            if (response.data.success) {
                sweetAlert(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went Wrong !!')
        } finally {
            if (fetchProductData) fetchProductData();
            if (close) close();
            if (setOpenMenuId) setOpenMenuId(null);
            if (setEditProductAdminModel) setEditProductAdminModel(false)
        }
    }


    return (<>

        {data &&

            <section onClick={close} className='upload-category-modal-wrapper' style={{ zIndex: '1000 !important' }}>
                <div onClick={(e) => e.stopPropagation()} className='upload-category-modal' style={{
                    height: '80%',
                    overflowY: 'auto',
                    maxWidth: '1000px',
                    position: 'absolute',
                    top: '60%',
                    transform: 'translateY(-60%)',
                    animation: 'none'
                }} >
                    <div className='category-model-head'>
                        <h1>Update Product Details</h1>
                        <button onClick={() => {
                            if (close) {
                                close()
                            }
                            if (setOpenMenuId) setOpenMenuId(null)
                        }}><IoClose /></button>
                    </div>
                    <section className='upload-product-wrapper'>
                        <div className='upload-product'>
                            <form onSubmit={handleSubmit}>
                                <div className='upload-product-item'>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Product Name'
                                        name='name'
                                        id='name' value={product.name}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className='upload-product-item'>
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        type="text"
                                        placeholder='Enter Product description'
                                        name='description'
                                        id='description'
                                        rows={3}
                                        multiple
                                        value={product.description}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className='upload-product-item upload-product-img-wrapper'>
                                    <p>Image</p>
                                    <label className='upload-product-img' htmlFor='image'>
                                        <FaCloudUploadAlt size={40} />
                                        <p>{uploadText}</p>
                                    </label>
                                    <input
                                        type="file"
                                        hidden name="image"
                                        id="image"
                                        onChange={handleProductImg}
                                    />
                                    {product.image[0] && (
                                        <div className='added-image-container'>
                                            {
                                                product.image.map((item,
                                                    index) => {
                                                    return <div key={item + index} className='added-image'>
                                                        <img
                                                            src={item}
                                                            alt="Image"
                                                        />
                                                        <p onClick={() => {
                                                            setViewImage(true)
                                                            setUrl(item)
                                                        }}
                                                        ><MdFullscreen /></p>
                                                        <span onClick={() => handleDelete(item)}><IoClose /></span>
                                                    </div>
                                                })
                                            }
                                        </div>

                                    )}
                                </div>
                                <div className='upload-product-item '>
                                    <label htmlFor="allCategory">Category</label>
                                    <div className='upload-category'>
                                        <select
                                            name="allCategory"
                                            id="allCategory"
                                            value={selectCategory}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const category = allCategory.find(cat => cat._id === value)
                                                setSelectCategory(value)
                                                setProduct((prev) => {
                                                    return {
                                                        ...prev,
                                                        category: [...prev.category, category]
                                                    }
                                                })
                                                setSelectCategory('')
                                            }}
                                        >
                                            <option disabled value="">Select Category</option>
                                            {allCategory.map((category, index) => {
                                                return <option key={index} value={category?._id}>{category?.name}</option>
                                            })}
                                        </select>
                                        <div className='upload-selected-category-wrapper'>
                                            {
                                                product.category.map((category, index) => {
                                                    // const categoryObj = allCategory.find(c => c._id === category);
                                                    return <div key={category._id + index + category.name} className='selected-category'>
                                                        <span>{category.name}
                                                            <p onClick={() => handleRemoveSelectedCategory(category)}><IoClose /></p>
                                                        </span>
                                                    </div>
                                                })
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className='upload-product-item '>
                                    <label htmlFor="subCategory">Sub Category</label>
                                    <div className='upload-category'>
                                        <select
                                            name="subCategory"
                                            id="subCategory"
                                            value={selectSubCategory}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const subCategoryCopy = subCategory.find(cat => cat._id === value)
                                                setSelectSubCategory(value)
                                                setProduct((prev) => {
                                                    return {
                                                        ...prev,
                                                        subCategory: [...prev.subCategory, subCategoryCopy]
                                                    }
                                                })
                                                // setSelectSubCategory('')
                                            }}
                                        >
                                            <option disabled value="">Select Sub Category</option>
                                            {subCategory.map((subCateg, index) => {
                                                return <option key={index} value={subCateg?._id}>{subCateg?.name}</option>
                                            })}
                                        </select>
                                        <div className='upload-selected-category-wrapper'>
                                            {
                                                product.subCategory.map((subCateg, index) => {
                                                    return <div key={subCateg + index} className='selected-category'>
                                                        <span>
                                                            {subCateg.name}
                                                            <p onClick={() => handleRemoveSelectedSubCategory(subCateg)}><IoClose /></p>
                                                        </span>
                                                    </div>
                                                })
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className='upload-product-item'>
                                    <label htmlFor="unit">Unit</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Product Unit'
                                        name='unit'
                                        id='unit'
                                        value={product.unit}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className='upload-product-item'>
                                    <label htmlFor="stock">stock</label>
                                    <input
                                        type="number"
                                        placeholder='Number of Stock'
                                        name='stock'
                                        id='stock'
                                        value={product.stock}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className='upload-product-item'>
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="number"
                                        placeholder='Enter Product Price'
                                        name='price'
                                        id='price'
                                        value={product.price}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className='upload-product-item'>
                                    <label htmlFor="discount">Discount</label>
                                    <input
                                        type="number"
                                        placeholder='Enter Product Discount'
                                        name='discount'
                                        id='discount'
                                        value={product.discount}
                                        onChange={handleChange}

                                    />
                                </div>
                                {
                                    Object?.keys(product?.more_details).map((key, index) => {
                                        return (
                                            <div key={key + index} className='upload-product-item'>
                                                <label htmlFor={key}>{key}</label>
                                                <textarea
                                                    type="text"
                                                    placeholder={key}
                                                    id={key}
                                                    value={product.more_details[key]}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        setProduct((prev) => {
                                                            return {
                                                                ...prev,
                                                                more_details: {
                                                                    ...prev.more_details,
                                                                    [key]: value
                                                                }
                                                            }
                                                        })
                                                    }}

                                                />
                                            </div>
                                        )
                                    })
                                }
                                <div
                                    onClick={() => setOpenAddField(true)}
                                    className='product-add-field-btn'>
                                    Add Field
                                </div >
                                <button disabled={
                                    !product.name ||
                                    !product.image[0] ||
                                    !product.description ||
                                    !product.stock ||
                                    !product.price ||
                                    !product.unit ||
                                    !product.category[0] ||
                                    !product.subCategory[0] ||
                                    !product.discount}
                                    className='add-product-btn'>

                                    Update Product
                                </button>
                            </form>
                        </div>


                        {viewImage && <ViewImage url={url} close={() => {
                            setUrl('')
                            setViewImage(false)
                        }} />}
                        {openAddField && (
                            <AddFieldComponent
                                value={fieldName}
                                onChange={(e) => setFieldName(e.target.value)}
                                submit={handleAddField}
                                close={() => setOpenAddField(false)}
                            />
                        )}
                    </section>
                </div>
            </section>
        }
    </>
    );
};

export default EditProductAdminModel;
