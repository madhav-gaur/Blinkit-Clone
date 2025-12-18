/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { calcBill } from '../components/calcBill'
import { RiEBike2Fill, RiFileList2Fill } from 'react-icons/ri'
import { GiShoppingBag } from 'react-icons/gi'
import "../pages/stylesheets/Checkout.css"
import { useNavigate } from 'react-router-dom'
import { UpdateCartItemQty } from '../components/UpdateCartItemQuantity'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import { IoClose } from 'react-icons/io5'
import emptyCart from "../assets/emptyCart.png"
import ButtonLoading from '../components/ButtonLoading'
import { HiOutlineShoppingCart } from 'react-icons/hi2'
import { FaChevronRight } from 'react-icons/fa6'
import Loading from '../components/Loading'
import { CartItem } from '../components/CartItem'
import { toast } from 'react-toastify'
export const Checkout = () => {
    const cartData = useSelector((state) => state.cart.cartSliceData)
    const { totalPayblePrice, totalSaving, productTotal, handlingCharge } = calcBill(cartData)
    const [selectedAddress, setSelectedAddress] = useState({})
    const [isOrderConfirmOpen, setIsOrderConfirmOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [paymentMode, setPaymentMode] = useState("Cash On Delivery");
    const [address, setAddress] = useState([])

    const fetchAddress = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getAddress
            })
            if (response.data.success) {
                let add = (response.data.data).filter(item => item.status)
                setAddress(add)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const getCartItem = async () => {
        try {
            await Axios({
                ...SummaryApi.getCartItem
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const placeCODOrder = async () => {

        try {
            setIsLoading(true)
            const response = await Axios({
                ...SummaryApi.CashOnDeliveryOrder,
                data: {
                    items: cartData.map(item => ({
                        productId: item.productId._id,
                        quantity: item.quantity,
                        product_details: {
                            name: item.productId.name,
                            image: item.productId.image,
                            price: item.productId.price,
                            discount: item.productId.discount
                        }
                    })),
                    delivery_address: selectedAddress._id,
                    totalPayblePrice: totalPayblePrice,
                    totalAmt: productTotal
                }
            })
            console.log(response)
            if (response.data.success) {
                setIsLoading(false)
                const orderId = response.data.data.orderId;

                navigate(`/success/${orderId}`, {
                    state: {
                        fromCheckout: true,
                        orderId,
                    },
                    replace: true,
                });
            }
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {
        fetchAddress()
        getCartItem()
    }, [])

    const navigate = useNavigate();
    useEffect(() => {
        if (address[0]) {
            setSelectedAddress(address[0])
        }
    }, [])
    return (
        <section className='checkout-wrapper'>
            {!cartData[0] && <div className='empty-cart-wrapper'>
                <div className='empty-cart-hero'>
                    <img src={emptyCart} alt="" />
                    <h2>You don't have any items in your cart to Checkout</h2>
                    <p>Your favourite items are just a click away</p>
                    <button onClick={() => {
                        navigate("/")
                    }}>Start Shopping</button>
                </div>
            </div>}
            {cartData[0] && <div className='checkout-hero'>
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
                                    if (!selectedAddress._id) toast.error("Please Select an Address")
                                    if (selectedAddress._id && totalPayblePrice && paymentMode) {
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
                        {cartData.map((item, index) => {
                            let product = item.productId
                            return <CartItem
                                key={item._id + index}
                                item={item}
                                product={product}
                                cartData={cartData}
                            />
                        })
                        }
                    </div>
                </div>
            </div>}
            {isOrderConfirmOpen && selectedAddress._id && <div className='final-confirmation-wrapper' onClick={() => setIsOrderConfirmOpen(false)}>
                <div className={`final-confirmation ${isOrderConfirmOpen ? "final-confirmation-animation" : ""}`} onClick={(e) => e.stopPropagation()}>
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
                        <button onClick={() => placeCODOrder()}> {isLoading ? <ButtonLoading /> : "Confirm Order "} </button>
                    </div>
                </div>
            </div>}
            {cartData[0] && location.pathname.startsWith("/checkout") &&
                <div>
                    <div className="sc-cart-info" style={{ maxWidth: "20rem" }} onClick={() => {
                        if (!selectedAddress._id) toast.error("Please Select an Address")
                        if (selectedAddress._id && totalPayblePrice && paymentMode) {
                            setIsOrderConfirmOpen(true)
                        }
                    }}>
                        <div className="sc-cart-info-left">
                            <div>
                                {cartData.length >= 1 ? cartData?.slice(-3).map((item, idx) => {
                                    return <span key={item._id + idx}> <img src={item.productId.image[0]} /></span>
                                }) :
                                    <HiOutlineShoppingCart />
                                }
                            </div>
                            <div>
                                <p>Confirm To Order </p>
                                <span>(View Details), {cartData?.length} Items</span>
                            </div>
                        </div>
                        <div className="sc-cart-info-right">
                            <FaChevronRight />
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

