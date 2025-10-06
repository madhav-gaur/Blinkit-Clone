import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { MdDelete, MdEdit } from 'react-icons/md';
import EditProductAdminModel from './EditProductAdminModel';
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { toast } from 'react-toastify';
import ConfirmBox from './ConfirmBox';

const ProductCardAdmin = ({ data, openMenuId, setOpenMenuId, fetchProductData }) => {
    // const [productCardAdminFunctions, setProductCardAdminFunctions] = useState(null);
    const toggleId = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    }
    const [confirmBox, setConfirmBox] = useState(false)
    const deleteProduct = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteProduct,
                data: { _id: openMenuId }
            })
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
        <div className="product-card-admin">
            <div className="image-box">
                <img src={data.image[0]} alt={data.name} />
            </div>
            <div className="product-card-detail-box">
                <p><strong>Name:</strong> {data.name}</p>
                <p><strong>Price:</strong> ₹{data.price}</p>
                <p><strong>Stock:</strong> {data.stock}</p>
                <p><strong>Unit:</strong> {data.unit}</p>
            </div>
            <div className='product-card-admin-functions'>
                <span onClick={() => toggleId(data._id)}>
                    {openMenuId == data._id ? <IoClose /> : <BsThreeDotsVertical />}
                </span>
                {openMenuId == data._id && <div className='product-card-admin-function-btn'>
                    <div onClick={() => setEditProductAdminModel(data)} ><MdEdit /> Edit</div>
                    <div onClick={()=>setConfirmBox(true)} ><MdDelete /> Delete</div>
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
                    confirm={deleteProduct}
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