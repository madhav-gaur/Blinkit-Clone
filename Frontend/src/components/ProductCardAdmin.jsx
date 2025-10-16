import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { MdDelete, MdEdit } from 'react-icons/md';
import EditProductAdminModel from './EditProductAdminModel';
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { toast } from 'react-toastify';
import ConfirmBox from './ConfirmBox';
import { validUrlConvert } from '../utils/ValidUrlConvert';
import { useNavigate } from 'react-router-dom';

const ProductCardAdmin = ({ data, openMenuId, setOpenMenuId, fetchProductData }) => {
    // const [productCardAdminFunctions, setProductCardAdminFunctions] = useState(null);
    const toggleId = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    }
    const navigate = useNavigate()
    const url = (name, id) => {
            return `/product/${validUrlConvert(name)}-${id}`
        }
    const [confirmBox, setConfirmBox] = useState(false)
    // const deleteCartProductOnProductDelete = async () => {
    //     try {
    //         const response = await Axios({
    //             ...SummaryApi.deleteCartProductOnProductDelete,
    //             data: { _id: openMenuId}
    //         })
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error)
    //     }
    // }
    const deleteProduct = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteProduct,
                data: { _id: openMenuId }
            })
            console.log(response)
            if (response.data.success) {
                toast.success('Product Deleted successfully');
            } else {
                toast.error(response.data.message || 'Failed to update');
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        } finally {
            setOpenMenuId(null)
            fetchProductData();
        }
    }
    const [editProductAdminModel, setEditProductAdminModel] = useState(null)
    return (
        <div className="product-card-admin" onClick={()=> navigate(url(data.name, data._id))}>
            <div className="image-box">
                <img src={data.image[0]} alt={data.name} />
            </div>
            <div className="product-card-detail-box">
                <p><strong>Name:</strong> {data.name}</p>
                <p><strong>Price:</strong> ₹{data.price}</p>
                <p><strong>Stock:</strong> {data.stock}</p>
                <p><strong>Unit:</strong> {data.unit}</p>
            </div>
            <div className='product-card-admin-functions' onClick={(e)=>e.stopPropagation()}>
                <span onClick={() => toggleId(data._id)}>
                    {openMenuId == data._id ? <IoClose /> : <BsThreeDotsVertical />}
                </span>
                {openMenuId == data._id && <div className='product-card-admin-function-btn'>
                    <div onClick={() => setEditProductAdminModel(data)} ><MdEdit /> Edit</div>
                    <div onClick={() => setConfirmBox(true)} ><MdDelete /> Delete</div>
                </div>}
            </div>
            {editProductAdminModel &&
                <EditProductAdminModel
                    data={editProductAdminModel}
                    fetchProductData={fetchProductData}
                    close={() => setEditProductAdminModel(null)}
                    setOpenMenuId={setOpenMenuId}
                />}
            {
                confirmBox && <ConfirmBox
                    close={() => {
                        setConfirmBox(false)
                        setOpenMenuId(null)
                    }}
                    confirm={()=>{
                        deleteProduct()
                    }}
                    cancel={() => {
                        setConfirmBox(false)
                        setOpenMenuId(null)
                    }}
                />
            }
        </div>
    )
}

export default ProductCardAdmin