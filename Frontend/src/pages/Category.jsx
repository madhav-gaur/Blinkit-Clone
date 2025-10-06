import React, { useEffect, useState } from 'react'
import UploadCategoryModal from '../components/UploadCategoryModal'
import Axios from '../utils/axios'

import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete, MdEdit } from 'react-icons/md';

import SummaryApi from '../common/summaryAPI'
import './stylesheets/Category.css'
import { IoClose } from 'react-icons/io5';
import EditCategoryModal from '../components/EditCategoryModal';
import { toast } from 'react-toastify';
import ConfirmBox from '../components/ConfirmBox';
const Category = () => {

    const [openUploadCategory, setOpenUploadCategory] = useState(false)
    const [openEditCategory, setOpenEditCategory] = useState(false)
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState([])
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [confirmBox, setConfirmBox] = useState(false)

    const toggleMenu = (    index) => {
        setActiveMenuIndex(activeMenuIndex === index ? null : index);
    };

    const fetchCategory = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            console.log(response)
            if (response.data.success) {
                setCategory(response.data.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchCategory()
    }, [])
    const handleDelete = async (item) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: {
                    _id: item._id
                }
            })
            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message)
                fetchCategory()
            }
        } catch (err) {
            toast.error(err)
        }
    }
    return (
        <section className='category-wrapper'>
            <div className='category'>
                <div className='category-head'>
                    <h2>Category</h2>
                    <button onClick={() => setOpenUploadCategory(true)}>+ Add Category</button>
                </div>
                <div className='category-item-wrapper subCategory-item-wrapper'>
                    {category.map((item, index) => (
                        <div className='category-item' key={index}>
                            <div className='category-item-details'>
                                {loading ? (
                                    <div className="image-loader"></div>
                                ) : (
                                    <img src={item.image} alt="category" />
                                )}
                            </div>
                            <div className='menu-icon' onClick={() => toggleMenu(index)}>
                                {
                                    activeMenuIndex === index ? <IoClose /> : <BsThreeDotsVertical />
                                }
                            </div>

                            {activeMenuIndex === index && (
                                <div className='category-dot-menu'>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(item);
                                            setOpenEditCategory(true);
                                            setActiveMenuIndex(null);
                                        }}
                                    >
                                        <MdEdit /> Edit
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedCategory(item);
                                            setConfirmBox(true);
                                            setActiveMenuIndex(null);
                                        }}
                                        className='category-delete-btn'
                                    >
                                        <MdDelete /> Delete
                                    </button>


                                </div>
                            )}
                        </div>


                    ))}
                </div>
            </div>

            {openUploadCategory && (
                <UploadCategoryModal fetchData={() => fetchCategory()} close={() => setOpenUploadCategory(false)} />
            )}

            {openEditCategory && selectedCategory && (
                <EditCategoryModal
                    fetchData={fetchCategory}
                    category={selectedCategory}
                    close={() => {
                        setOpenEditCategory(false);
                        setSelectedCategory(null);
                    }}
                />
            )}
            {confirmBox && selectedCategory && (
                <ConfirmBox
                    close={() => setConfirmBox(false)}
                    cancel={() => {
                        setConfirmBox(false);
                        setSelectedCategory(null);
                    }}
                    confirm={() => {
                        handleDelete(selectedCategory);
                        setConfirmBox(false);
                        setSelectedCategory(null);
                    }}
                />
            )}

        </section>
    )
}

export default Category
