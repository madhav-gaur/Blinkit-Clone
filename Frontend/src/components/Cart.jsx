import React, { useEffect } from 'react'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import "../components/stylesheets/Cart.css"
import { IoClose } from 'react-icons/io5'
import { RiFileList2Fill } from "react-icons/ri";
import { RiEBike2Fill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { MdOutlineChevronRight } from "react-icons/md";
import { useSelector } from 'react-redux'
import { UpdateCartItemQty } from './UpdateCartItemQuantity'
import emptyCart from "../assets/emptyCart.png"
import { useNavigate } from 'react-router-dom'
import { validUrlConvert } from '../utils/ValidUrlConvert'
export const Cart = ({ isCart, setIsCart, cartData, totalSaving, handlingCharge, productTotal, setCartData }) => {

    const navigate = useNavigate()
    const url = (name, id) => {
        return `/product/${validUrlConvert(name)}-${id}`
    }

    const getCartItem = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCartItem
            })
            setCartData(response.data.data || [])
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getCartItem()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const totalPayblePrice = useSelector((state) => state.cart.cartPaybleAmount)
    const handleUpdate = (updation, id) => {
        UpdateCartItemQty(updation, id, cartData, getCartItem);
        getCartItem()
    };

    // const deleteCartItem = async (id) => {
    //     try {
    //         const suspectProduct = data.find((item) => item._id == id);
    //         console.log(suspectProduct._id)
    //         const response = await Axios({
    //             ...SummaryApi.deleteCartItem,
    //             data: {
    //                 cartItemId: suspectProduct._id,
    //             }
    //         })
    //         console.log(response)
    //     }
    //     catch (error) {
    //         console.error(error)
    //     } finally {
    //         getCartItem()
    //     }
    // }
    useEffect(() => {
        getCartItem()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPayblePrice])
    return (
        <section className="cart-wrapper" onClick={() => setIsCart(false)}>
            <div onClick={(e) => e.stopPropagation()} className={`cart-hero ${isCart ? "cart-animation" : ""}`}>
                <div className='cart-head'>
                    <h2>My Cart</h2>
                    <button onClick={() => setIsCart(false)}><IoClose /></button>
                </div>
                {cartData[0] && <>
                    <div className='cart-savings'>
                        <p>Your Total Savings</p>
                        <p>₹{totalSaving}</p>
                    </div>
                    <div className='cart-product-wrapper'>
                        {
                            cartData.map((item, index) => {
                                let product = item.productId
                                return (
                                    <div key={product?._id + index} className='cart-product' >
                                        <div className='cart-product-hero' onClick={() => {
                                            navigate(url(product._name, product._id))
                                            setIsCart(false)
                                        }}>
                                            <div className='cart-product-img'>
                                                <img src={product?.image[0]} alt={product?.name} />
                                            </div>
                                            <div className='cart-product-details'>
                                                <p>{product?.name}</p>
                                                <span>{product?.unit}</span>
                                                <legend>
                                                    <strong>₹{Math.floor(product?.price - product?.price * product?.discount / 100)}</strong>
                                                    <strike>₹{product?.price}</strike>
                                                </legend>
                                            </div>
                                        </div>
                                        <div className='quantity-controls'>
                                            <div className='qnt-control-hero'>
                                                <button onClick={() => handleUpdate("remove", item.productId._id)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleUpdate("add", item.productId._id)} disabled={item.quantity == 9 ? true : false}>+</button>
                                            </div>
                                        </div>
                                    </div>)
                            })
                        }
                    </div>
                    <div className='bill-wrapper'>
                        <div className='bill-hero'>
                            <h2>Bill Details</h2>
                            <div className='bill-details'>
                                <div className='bill-detail-item'>
                                    <p>
                                        <RiFileList2Fill />
                                        <span>Items Total</span>
                                    </p>
                                    <b>
                                        <s>{cartData[0] ? (<>₹{totalSaving + productTotal}</>) : " "}</s>
                                        <span>₹{productTotal}</span>
                                    </b>
                                </div>
                                <div className='bill-detail-item'>
                                    <p>
                                        <RiEBike2Fill />
                                        <span>Delivery Charge</span>
                                    </p>
                                    <b>
                                        <span>{cartData[0] ? (productTotal > 99 ? <p style={{ color: "#256fef" }}><s>₹25</s> FREE</p> : "₹25") : "---"}</span>
                                    </b>
                                </div>
                                <div className='bill-detail-item'>
                                    <p>
                                        <GiShoppingBag />
                                        <span>Handling Charge</span>
                                    </p>
                                    <b>
                                        <span>{cartData[0] ? <>₹ {handlingCharge}</> : "---"}</span>
                                    </b>
                                </div>
                                <div className='bill-detail-item grand-total'>
                                    <p>
                                        <span>Grand Total</span>
                                    </p>
                                    <b>
                                        <span>₹{totalPayblePrice}</span>
                                    </b>
                                </div>
                            </div>
                        </div>
                        <div className='cart-savings saving-curve-box'>
                            <p>Your Total Savings</p>
                            <p>₹{totalSaving}</p>
                        </div>
                    </div>
                    <div className='cart-cancellation-policy'>
                        <h2>Cancelletion Policy</h2>
                        <p>
                            Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
                        </p>
                    </div>
                    <div className='checkout-notch'>
                        <div className='checkout-strip' onClick={() => {
                            navigate("/checkout")
                            setIsCart(false)
                        }}>
                            <div>
                                <span>₹{totalPayblePrice}</span>
                                <p>TOTAL</p>
                            </div>
                            <button>
                                Proceed <MdOutlineChevronRight />
                            </button>
                        </div>
                    </div>
                </>}

                {!cartData[0] && <div className='empty-cart-wrapper'>
                    <div className='empty-cart-hero'>
                        <img src={emptyCart} alt="" />
                        <h2>You don't have any items in your cart</h2>
                        <p>Your favourite items are just a click away</p>
                        <button onClick={() => {
                            navigate("/")
                            setIsCart(false)
                        }}>Start Shopping</button>
                    </div>
                </div>}
            </div>
        </section >
    )
}

