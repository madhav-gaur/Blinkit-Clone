import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
// import './stylesheets/UploadCategoryModal.css'
import { MdCloudUpload } from 'react-icons/md'
import { uploadImage } from '../utils/uploadImage'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import { toast } from 'react-toastify'
const UploadCategoryModal = ({ close, fetchData }) => {
    const [name, setName] = useState("")
    const [image, setImage] = useState("")

    const [loading, setLoading] = useState("+ Add Category")

    const handleCategoryImg = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const uploadImg = await uploadImage(file)
        console.log(uploadImg)
        setImage(uploadImg.data.data.url)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading("Uploading...")
            const response = await Axios({
                ...SummaryApi.addCategory,
                data: {
                    name: name,
                    image: image
                }
            })
            if (response.data.success) {
                fetchData()
                toast.success("Category Added")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading("Added Successfully")
            setName("")
            setImage("")
            setLoading("+ Add Category")
            close()
        }
    }
    return (
        <section className='upload-category-modal-wrapper'>
            <div className='upload-category-modal'>
                <div className='category-model-head'>
                    <h1>
                        Category
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
                                placeholder='Enter Category Name'
                                value={name}
                                id='categoryName'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label htmlFor="categoryImage">Image</label>
                        <label htmlFor="categoryImage" style={{ backgroundColor: image ? "white" : "#d5efff" }} className='category-img-upload'>
                            {
                                image ? (
                                    <img src={image} alt="" />
                                ) :
                                    (<div>
                                        <p>No Image Provided</p>
                                        <span> <MdCloudUpload />Upload Image</span>
                                    </div>

                                    )
                            }
                            <input
                                onChange={handleCategoryImg}
                                type="file"
                                id='categoryImage'
                            />
                        </label>
                        <button disabled={!name || !image}>{loading}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UploadCategoryModal
