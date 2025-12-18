import './stylesheets/UploadProduct.css'
import { useState } from 'react'
import Axios from '../utils/axios'
import { MdFullscreen } from "react-icons/md";
import { toast } from 'react-toastify';
import SummaryApi from '../common/summaryAPI'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { uploadImage } from '../utils/uploadImage'
import { IoClose } from 'react-icons/io5';
import ViewImage from '../components/ViewImage';
import { useSelector } from 'react-redux';
import AddFieldComponent from '../components/AddFieldComponent';
import sweetAlert from '../utils/sweetAlert'
const ProductAdmin = () => {

  const [product, setProduct] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  })

  const allCategory = useSelector(state => state.product.allCategory)
  const subCategory = useSelector(state => state.product.subCategory)



  const [uploadText, setUploadText] = useState('Upload Image')
  const [viewImage, setViewImage] = useState(false)
  const [url, setUrl] = useState('')
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState('')
  console.log(selectSubCategory)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => {
      return { ...prev, [name]: value }
    })
  }
  const handleProductImg = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    // console.log(file);
    setUploadText('Uploading...')
    try {

      const imageResponse = await uploadImage(file)
      setUploadText('Uploaded Sucessfully')

      console.log(imageResponse)
      setProduct((prev) => ({
        ...prev,
        image: [...prev.image, imageResponse.data.data.url],

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
    const find = product.image.find(item => item === image)
    console.log(find)
    setProduct((prev) => ({
      ...prev,
      image: prev.image.filter(item => item != image)
    }))
  }
  const handleRemoveSelectedCategory = (category) => {
    const find = product.category.find(item => item === category)
    console.log(find)
    setProduct((prev) => ({
      ...prev,
      category: prev.category.filter(item => item != category)
    }))
  }
  const handleRemoveSelectedSubCategory = (subCategory) => {
    const find = product.subCategory.find(item => item === subCategory)
    console.log(find)
    setProduct((prev) => ({
      ...prev,
      subCategory: prev.subCategory.filter(item => item != subCategory)
    }))
  }
  const handleAddField = () => {
    console.log('okk');

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
    setOpenAddField(close)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: product
      })
      if (response.data.success) {
        sweetAlert(response.data.message)
      }
      // console.log(response)
    } catch (error) {
      console.error(error)
      toast.error('Something went Wrong !!')
    } finally {
      setProduct({
        name: "",
        image: [],
        category: [],
        subCategory: [],
        unit: "",
        stock: "",
        price: "",
        discount: "",
        description: "",
        more_details: {},
      })
    }
  }
  return (
    <section className='upload-product-wrapper'>
      <div className='upload-product-head'>
        <h2>Upload Product</h2>
      </div>
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
                  product.image.map((item, index) => {
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
                  const value = e.target.value
                  const category = allCategory.find(cat => cat._id === value)
                  console.log(category)
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
                    return <div key={category._id + index} className='selected-category'>
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
                  console.log(subCategoryCopy)
                  setSelectSubCategory(value)
                  setProduct((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategoryCopy]
                    }
                  })
                  setSelectSubCategory('')
                }}
              >
                <option disabled value="">Select Sub Category</option>
                {subCategory.map((subCategory, index) => {
                  return <option key={index} value={subCategory?._id}>{subCategory?.name}</option>
                })}
              </select>
              <div className='upload-selected-category-wrapper'>
                {
                  product.subCategory.map((subCategory, index) => {
                    return <div key={subCategory._id + index} className='selected-category'>
                      <span>{subCategory.name}
                        <p onClick={() => handleRemoveSelectedSubCategory(subCategory)}><IoClose /></p>
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

            Add Product
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
  )
}

export default ProductAdmin
