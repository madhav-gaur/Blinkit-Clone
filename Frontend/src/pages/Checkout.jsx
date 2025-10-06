import React from 'react'
import { useSelector } from 'react-redux'
import { calcBill } from '../components/calcBill'
import { RiEBike2Fill, RiFileList2Fill } from 'react-icons/ri'
import { GiShoppingBag } from 'react-icons/gi'
import "../pages/stylesheets/Checkout.css"
export const Checkout = () => {
    const cartData = useSelector((state) => state.cart.cartSliceData)
    const { totalPayblePrice, totalSaving, productTotal, handlingCharge } = calcBill(cartData)
    return (
        <section className='checkout-wrapper'>
            <div className='checkout-hero'>
                <div className='checkout-address-wrapper'>
                    <h2>Choose Your Address</h2>
                    <div></div>
                </div>
                <div className='bill-wrapper' style={{ border: "1px solid #ecececff", maxWidth: "500px", width: "100%" }}>
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
                            <button>Online Payment</button>
                            <button>Cash on Delivery</button>
                        </div>
                    </div>
                    <div className='cart-savings saving-curve-box'>
                        <p>Your Total Savings</p>
                        <p>₹{totalSaving}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

