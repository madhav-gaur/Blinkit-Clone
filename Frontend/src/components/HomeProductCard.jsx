/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validUrlConvert } from '../utils/ValidUrlConvert';
import { MdEdit } from "react-icons/md";
import isAdmin from '../utils/isAdmin';
import { useDispatch, useSelector } from 'react-redux';
import EditProductAdminModel from './EditProductAdminModel';
import { toast } from 'react-toastify';
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { UpdateCartItemQty } from './UpdateCartItemQuantity';
import { setCartPaybleAmount, setCartSliceData } from '../store/cartSlice';
import { calcBill } from './calcBill';
import ButtonLoading from './ButtonLoading';
// import { getCartItem } from './getCartItem';


const HomeProductCard = ({ data }) => {
  const url = `/product/${validUrlConvert(data.name)}-${data._id}`
  const user = useSelector((state) => state.user)
  const [editProductAdminModel, setEditProductAdminModel] = useState(null)
  const cartData = useSelector((state) => state.cart.cartSliceData)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    // console.log(data._id)
  }, [cartData])

  const navigate = useNavigate()

  // console.log(cartData)

  const addToCart = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: data._id,
          userId: user._id
        }
      })
      setLoading(true)
      if (response.data.success) {
        await getCartItem()
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message || "Something went Wrong !")
    } finally {
      setLoading(false)
    }
  }
  const cartItem = cartData.find((item) => item?.productId?._id === data._id);
  const getCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem
      })
      dispatch(setCartSliceData(response.data.data))
    }
    catch (error) {
      console.error(error)
    }
  }

  const { totalPayblePrice } = calcBill(cartData)
  useEffect(() => {
    dispatch(setCartPaybleAmount(totalPayblePrice))
  }, [dispatch, totalPayblePrice])
  useEffect(() => {
    getCartItem()
  }, [])
  const handleItemUpdate = (updation, id) => {
    UpdateCartItemQty(updation, id, cartData, getCartItem);
  };
  return (
    <div className='home-product-card'>
      {isAdmin(user.role) && <div onClick={() => setEditProductAdminModel(data)} className='home-product-edit'><MdEdit /></div>}
      <div onClick={() => navigate(url)} className='home-product-img'>
        <img src={data.image[0]} alt={data.name} />
      </div>
      <div className='home-product-details' onClick={() => navigate(url)}>
        <span className="product-time"> 8 mins</span>
        <h2>{data.name}</h2>
        <p>{data.unit}</p>
        <div className='product-price-add' onClick={(e) => e.stopPropagation()}>
          <span>₹{data.price}.00</span>
          {!cartItem &&
            <button className='add-button' disabled={loading ? true : false} style={{ width: "65px", height: "35px", }} onClick={(e) => {
              if(!user._id) navigate("/login  ")
              e.stopPropagation()
              setLoading(true)
              addToCart()
            }}>
              {loading ? <ButtonLoading /> : "ADD"}
            </button>}
          {cartItem &&
            <div className='quantity-controls' style={{ width: "1 " }}>
              <div className='qnt-control-hero' style={{ width: "65px", height: "35px" }}>
                <button onClick={() => handleItemUpdate("remove", data._id)}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => handleItemUpdate("add", data._id)} disabled={cartItem.quantity >= 9 ? true : false}>+</button>
              </div>
            </div>
          }
        </div>
      </div>
      {(data.discount > 15 || data.price > 500) && <div className='discount-badge'>
        <p>{data.discount}%</p>
        <span>off</span>
      </div>}
      {
        editProductAdminModel &&
        <EditProductAdminModel
          data={editProductAdminModel}
          close={() => setEditProductAdminModel(null)}
          editProductAdminModel={editProductAdminModel}
        />
      }
    </div >
  );
};

export default HomeProductCard;
