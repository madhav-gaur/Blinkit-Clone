/* eslint-disable react-hooks/exhaustive-deps */
import{ useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { validUrlConvert } from '../utils/ValidUrlConvert';
import { MdEdit } from "react-icons/md";
import isAdmin from '../utils/isAdmin';
import { useDispatch, useSelector } from 'react-redux';
import EditProductAdminModel from './EditProductAdminModel';
import { toast } from 'react-toastify';
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { setCartPaybleAmount, setCartSliceData } from '../store/cartSlice';
import { calcBill } from './calcBill';
import ButtonLoading from './ButtonLoading';
import { HandleQntUpdate } from './HandleQntUpdate';

const HomeProductCard = ({ data }) => {
  const url = `/product/${validUrlConvert(data.name)}-${data._id}`
  const user = useSelector((state) => state.user)
  const [editProductAdminModel, setEditProductAdminModel] = useState(null)
  const cartData = useSelector((state) => state.cart.cartSliceData)
  const cartItem = cartData.find((item) => item?.productId?._id === data._id);

  const [loading, setLoading] = useState(false)
  // console.log(data)
  const dispatch = useDispatch()
  useEffect(() => {
    // console.log(data._id)
  }, [cartData])

  const navigate = useNavigate()

  // console.log(cartData)

  const addToCart = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: data._id,
          userId: user._id
        }
      })
      if (response.data.success) {
        await getCartItem()
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message || "Something went Wrong !")
    }
  }
  // console.log(cartItem)
  const [localQty, setLocalQty] = useState(cartItem?.quantity || 0)
  // console.log(localQty)
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
  // useEffect(() => {
  //   HandleQntUpdate(type, localQty, cartItem, cartData, setLocalQty, setLoading, updation, id)
  // }, [])

  // useEffect(() => {
  //   if (cartItem?.quantity != null) {
  //     setLocalQty(cartItem.quantity)
  //   }
  // }, [cartItem?.quantity])

  // const handleQntUpdate = async (type) => {
  //   let newQty = type === "add" ? localQty + 1 : localQty - 1
  //   if (type == "remove" && localQty === 1) {
  //     setLocalQty(0)
  //     setLoading(false)
  //     try {
  //       await UpdateCartItemQty("remove", cartItem.productId._id, cartData)
  //     } catch (err) {
  //       console.error(err)
  //       setLocalQty(localQty)
  //     }

  //     return
  //   }
  //   if (newQty < 1 || newQty > 9) return

  //   setLocalQty(newQty)

  //   try {
  //     await UpdateCartItemQty(type, cartItem.productId._id, cartData)
  //   } catch (err) {
  //     console.error(err)
  //     setLocalQty(cartItem.quantity)
  //   }
  // }
  // const handleItemUpdate = (updation, id) => {
  //   UpdateCartItemQty(updation, id, cartData, getCartItem);
  // };
  useEffect(() => {
    if (cartItem?.quantity != null) {
      setLocalQty(cartItem.quantity)
    }
  }, [cartItem?.quantity])

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
          <div style={{ overflow: "hidden" }}>
            {localQty == 0 ?
              <button className='add-button' disabled={loading ? true : false} style={{ width: "65px", height: "35px", }} onClick={(e) => {
                if (!user._id) navigate("/login  ")
                e.stopPropagation()
                setLoading(true)
                addToCart()
              }}>
                {loading ? <ButtonLoading /> : "ADD"}
              </button> : (
                <div className='quantity-controls' style={{ width: "1 " }}>
                  <div className='qnt-control-hero' style={{ width: "65px", height: "35px" }}>
                    <button onClick={() => HandleQntUpdate({
                      updationType: "remove",
                      localQty,
                      cartData,
                      setLocalQty,
                      setLoading,
                      id: cartItem?.productId?._id
                    })}>-</button>

                    <span>{localQty}</span>

                    <button onClick={() => HandleQntUpdate({
                      updationType: "add",
                      localQty,
                      cartData,
                      setLocalQty,
                      setLoading,
                      id: cartItem?.productId?._id
                    })} disabled={localQty >= 9}>+</button>
                  </div>
                </div>
              )}
          </div>
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
