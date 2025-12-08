/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { calcBill } from '../components/calcBill'
import { RiEBike2Fill, RiFileList2Fill } from 'react-icons/ri'
import { GiShoppingBag } from 'react-icons/gi'
import "../pages/stylesheets/Checkout.css"
import { useNavigate } from 'react-router-dom'
import { validUrlConvert } from '../utils/ValidUrlConvert'
import { UpdateCartItemQty } from '../components/UpdateCartItemQuantity'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import { IoClose } from 'react-icons/io5'
export const Checkout = () => {
    const cartData = useSelector((state) => state.cart.cartSliceData)
    const address = useSelector((state) => state.address.address).filter(item => item.status)
    const { totalPayblePrice, totalSaving, productTotal, handlingCharge } = calcBill(cartData)
    const [selectedAddress, setSelectedAddress] = useState({})
    const [isOrderConfirmOpen, setIsOrderConfirmOpen] = useState(false);
    const [paymentMode, setPaymentMode] = useState("");
    const url = (name, id) => {
        return `/product/${validUrlConvert(name)}-${id}`
    }

    const getCartItem = async () => {
        try {
            await Axios({
                ...SummaryApi.getCartItem
            })
            // setCartData(response.data.data || [])
        }
        catch (error) {
            console.error(error)
        }
    }
    const placeCODOrder = async () => {

        try {
            const response = await Axios({
                ...SummaryApi.CashOnDeliveryOrder,
                data: {
                    productId: cartData.map(item => item.productId),
                    productDetails: cartData.map(item => ({
                        name: item.name,
                        image: item.image
                    })),
                    deliveryAddress: selectedAddress,
                    totalPayblePrice: totalPayblePrice,
                    totalAmt: productTotal
                }
            })
            console.log(response)
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {
        getCartItem()
    }, [])
    const handleUpdate = (updation, id) => {
        UpdateCartItemQty(updation, id, cartData, getCartItem);
        getCartItem()
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (address[0]) {
            setSelectedAddress(address[0])
        }
    }, [])
    // console.log(selectedAddress)
    return (
        <section className='checkout-wrapper'>
            <div className='checkout-hero'>
                <div className='checkout-left'>
                    <div className='checkout-address-wrapper'>
                        {address[0] && <>
                            <div className='category-head choose-address-head' style={{ border: "none", padding: "10px 1rem 0 1rem" }}>
                                <h2 style={{ fontSize: "1.2rem" }}>Choose Your Address</h2>
                                <button onClick={() => navigate("/account/address")}>+ Add Address</button>
                            </div>
                            <div className='checkout-address'>{
                                address.map((item, idx) => {
                                    return <div key={item._id + idx}
                                        onClick={() => setSelectedAddress(item)}
                                        className='address-item checkout-address-item'
                                        style={{ borderColor: selectedAddress._id == item._id && "#0075ff" }}>
                                        <div className='address-checkbox-wrapper'>
                                            <div className='address-checkbox' style={{ borderColor: selectedAddress._id == item._id && "#0075ff" }}>
                                                <button
                                                    style={{ borderColor: selectedAddress._id == item._id ? "#0075ff" : "transparent", backgroundColor: selectedAddress._id == item._id && "#0075ff" }}>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <span>{item.address_line}, {item.city}</span>
                                            <span>{item.state}, {item.pincode}</span>
                                            <p>{item.country}</p>
                                            <p>{item.mobile}</p>
                                        </div>
                                    </div>
                                })
                            }
                            </div>
                        </>}
                        {!address[0] && (
                            <div className='add-address-checkout'>
                                <button onClick={() => navigate("/account/address")}>+ Add Address</button>
                            </div>
                        )}
                    </div>
                    <div className='bill-wrapper' style={{ border: "1px solid #ecececff", width: "100%" }}>
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
                            <div className='checkout-payment-mode-btns'>
                                <button>Online Payment (Not Available)</button>
                                <button onClick={() => {
                                    setPaymentMode("Cash On Delivery")
                                    if (selectedAddress && totalPayblePrice && paymentMode) {
                                        setIsOrderConfirmOpen(true)
                                    }
                                }}>Cash on Delivery</button>
                            </div>
                        </div>
                        <div className='cart-savings saving-curve-box'>
                            <p>Your Total Savings</p>
                            <p>₹{totalSaving}</p>
                        </div>
                    </div>
                </div>
                <div className='checkout-right'>
                    <div className='cart-product-wrapper'>
                        {
                            cartData.map((item, index) => {
                                let product = item.productId
                                return (
                                    <div key={product?._id + index} className='cart-product' >
                                        <div className='cart-product-hero' onClick={() => {
                                            navigate(url(product._name, product._id))
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
                </div>
            </div>
            {isOrderConfirmOpen && <div className='final-confirmation-wrapper'>
                <div className='final-confirmation'>
                    <div>
                        <div className='final-confirmation-close' onClick={() => setIsOrderConfirmOpen(false)}><IoClose /></div>
                        <h3>Confirm Your Order</h3>
                        <p><b>Deliver to:</b></p>
                        <div style={{ marginBottom: "1rem" }}>
                            <span>{selectedAddress.address_line}, {selectedAddress.city}, </span>
                            <span>{selectedAddress.state}, {selectedAddress.pincode}, </span>
                            <p>{selectedAddress.country}, </p>
                            <p>Mobile: {selectedAddress.mobile}</p>
                        </div>
                        <p style={{ marginBottom: "1rem" }}><b>Mode of Payment: </b>{paymentMode}</p>
                        <p style={{ marginBottom: "1rem" }}><b>Total Amount: </b> ₹{totalPayblePrice}</p>
                    </div>
                    <div className='final-confirmation-btns'>
                        <button onClick={() => {
                            setIsOrderConfirmOpen(false)
                            setPaymentMode("")
                        }}>Cancel</button>
                        <button onClick={() => placeCODOrder()}>Confirm Order</button>
                    </div>
                </div>
            </div>}
        </section>
    )
}

